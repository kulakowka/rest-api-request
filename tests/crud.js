'use strict'

const async = require('async')

// Request options
const options = {
  baseUrl: 'http://localhost:3333'
}

const API = require('../lib/request')(options)

// Define model

const Model = API.model('test')

async.series({
  create: (callback) => {
    Model.create({name: 'testname'}).exec()
    .then(model => callback(null, model))
    .catch(callback)
  },
  find: (callback) => {
    Model.find({name: 'testname'}).exec()
    .then(models => callback(null, models))
    .catch(callback)
  },
  update: (callback) => {
    Model.update({name: 'testname'}, {name: 'newname'}).exec()
    .then(model => callback(null, model))
    .catch(callback)
  },
  findOne: (callback) => {
    Model.findOne({name: 'newname'}).exec()
    .then(model => callback(null, model))
    .catch(callback)
  },
  delete: (callback) => {
    Model.delete({name: 'newname'}).exec()
    .then(model => callback(null, model))
    .catch(callback)
  }
}, (err, response) => {
  if (err) return console.log('Error: ', err)
  console.log(response)
})
