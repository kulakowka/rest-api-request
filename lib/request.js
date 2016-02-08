'use strict'

const request = require('request')

const defaultOptions = {
  json: true,
  timeout: 1000,
  time: true
}

class ApiRequest {
  constructor (options, model, action, method) {
    options = Object.assign(defaultOptions, options)
    this.action = action
    this.model = model
    this.method = method
    this.request = request.defaults(options)
    this.query = {}
  }

  exec () {
    const url = this.getUrl()
    return new Promise((resolve, reject) => {
      this.request({
        url,
        method: this.method,
        form: this.form
      }, (err, response, body) => {
        if (err) return reject(err)
        resolve(body)
      })
    })
  }

  getUrl () {
    const qs = Object.keys(this.query).map(key => `${key}=${this.query[key]}`).join('&')
    const path = `/${this.model}/${this.action}`
    return qs ? `${path}?${qs}` : path
  }

  // Add form data to request
  // .form({name: 'user1', password: '123'})
  form (attributes) {
    if (attributes) this.form = attributes
    return this
  }

  // Add where condition
  // .where({name: 'user1'})
  where (where) {
    if (!where) return this
    this.query.where = JSON.stringify(where)
    return this
  }

  // Add fields wich must be selected
  // .select('_id,name,slug')
  // .select(['_id','name','slug'])
  select (fields) {
    if (!fields) return this
    switch (typeof fields) {
      case 'string':
        this.query.select = fields
        break
      case 'object':
        this.query.select = fields.join(',')
        break
    }
    return this
  }

  // Add fileds wich must be populated
  // .populate('articles,contributors,creator')
  // .populate(['articles','contributors','creator'])
  populate (fields) {
    if (!fields) return this
    switch (typeof fields) {
      case 'string':
        this.query.populate = fields
        break
      case 'object':
        this.query.populate = fields.join(',')
        break
    }
    return this
  }

  // Add fileds wich must be populated
  // .sort('-createdAt -name')
  // .sort({ createdAt: -1, name: -1 })
  sort (fields) {
    if (!fields) return this
    switch (typeof fields) {
      case 'string':
        this.query.sort = fields
        break
      case 'object':
        this.query.sort = JSON.stringify(fields)
        break
    }
    return this
  }

  // Add limit
  // .limit(10)
  limit (limit) {
    if (limit) this.query.limit = parseInt(limit, 10)
    return this
  }

  // Add offset
  // .offset(10)
  offset (offset) {
    if (offset) this.query.offset = parseInt(offset, 10)
    return this
  }

}

module.exports = function (options) {
  return {
    model (model) {
      return {
        // find ([condition])
        find (condition) {
          return new ApiRequest(options, model, 'index', 'get').where(condition)
        },

        // findOne ([condition])
        findOne (condition) {
          return new ApiRequest(options, model, 'show', 'get').where(condition)
        },

        // create ([attributes])
        create (attributes) {
          return new ApiRequest(options, model, 'create', 'post').form(attributes)
        },

        // update ([condition], [attributes])
        update (condition, attributes) {
          return new ApiRequest(options, model, 'update', 'put').where(condition).form(attributes)
        },

        // delete ([condition])
        delete (condition) {
          return new ApiRequest(options, model, 'delete', 'delete').where(condition)
        }
      }
    }
  }
}
