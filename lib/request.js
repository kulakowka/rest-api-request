'use strict'

const request = require('request')

const defaultOptions = {
  json: true,
  timeout: 1000,
  time: true
}

class ApiRequest {
  constructor (options, model, id) {
    options = Object.assign(defaultOptions, options)
    this.model = model
    this.id = id
    this.request = request.defaults(options)
    this.query = {}
  }

  send () {
    const url = this.getUrl()
    return new Promise((resolve, reject) => {
      this.request(url, (err, response, body) => {
        if (err) return reject(err)
        resolve(body)
      })
    })
  }

  getUrl () {
    const qs = Object.keys(this.query).map(key => `${key}=${this.query[key]}`).join('&')
    const path = this.id ? `/${this.model}/${this.id}` : `/${this.model}`
    return qs ? `${path}?${qs}` : path
  }

  // .where({slug: 'npm'})
  where (where) {
    if (!where) return this
    this.query.where = JSON.stringify(where)
    return this
  }

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

  // .limit(10)
  limit (limit) {
    if (limit) this.query.limit = parseInt(limit, 10)
    return this
  }

  // .offset(10)
  offset (offset) {
    if (offset) this.query.offset = parseInt(offset, 10)
    return this
  }

}

module.exports = function (options) {
  return {
    find (model, id) {
      return new ApiRequest(options, model, id)
    }
  }
}
