'use strict'

const request = require('request')
const qs = require('qs')

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
    const query = qs.stringify(this.query, {
      encode: true,
      // arrayFormat: 'brackets'
    })
    const path = `/${this.model}/${this.action}`
    return query ? `${path}?${query}` : path
  }

  // Add form data to request
  // .form({name: 'user1', password: '123'})
  form (attributes) {
    if (attributes) this.form = attributes
    return this
  }

  // Add where condition
  // .where({name: 'user1'})
  where (fields) {
    if (!fields) return this
    
    this.query.where = this.query.where || {}
    
    Object.assign(this.query.where, fields)

    return this
  }

  // Add fields wich must be selected
  // .select('name age +notselected')
  // .select('name age -password')
  // .select({
  //   name: 1, 
  //   user: 1, 
  //   source: -1
  // })
  select (fields) {
    if (!fields) return this
    
    this.query.select = this.query.select || []

    switch (typeof fields) {
      case 'string':
        fields.split(/\s+/gi).map(field => {
          this.query.select.push(field)
        })
        break
      case 'object':
        this.query.select.push(fields)
        break
    }
    
    return this
  }

  // Add fileds wich must be populated
  // .populate('creator')
  // .populate('creator', 'name age createdAt') // only return the Persons name
  // .populate('creator contributors') // space delimited path names
  //
  // .populate('fans')
  // .populate('_creator')
  populate (fields, subfields) {
    if (!fields) return this

    this.query.populate = this.query.populate || []

    switch (typeof fields) {
      case 'string':
        if (subfields) {
          this.query.populate.push({ 
            path: fields,
            select: subfields
          })
        } else {
          fields.split(/\s+/gi).map(field => {
            this.query.populate.push(field)  
          })
        }
        break
      case 'object':
        this.query.populate.push(fields)
        break
    }
    // console.log('')
    // console.log('QUERY OBJECT:')
    // console.log(this.query)
    return this
  }

  // Add fileds wich must be populated
  // .sort('-createdAt -name')
  // .sort({ createdAt: -1, name: -1 })
  sort (fields) {
    if (!fields) return this

    this.query.sort = fields

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

// Helpers

/**
  console.log( converStringToObject('-name    ') )
  console.log( converStringToObject('name    ') )
  { name: -1 }
  { name: 1 }
 */
function converStringToObject (field) {
  let name = field.replace(/\s|-/gi, '')
  return {
    [name]: /^-/gi.test(field) ? -1 : 1
  }
}
