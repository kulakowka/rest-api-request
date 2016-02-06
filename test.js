'use strict'

const async = require('async')

// Request options
const options = {
  baseUrl: 'http://localhost:3001'
}

const API = require('./lib/request')(options)

// Define model

const Model = API.model('platform')

// Testing method .getUrl()

let indexUrl = Model.find({name: 'testname'}).getUrl()
let showUrl = Model.findOne({name: 'testname'}).getUrl()
let createUrl = Model.create().getUrl()
let updateUrl = Model.findOne({name: 'testname'}).getUrl()
let deleteUrl = Model.findOne({name: 'testname'}).getUrl()

console.log('GET %s', indexUrl)
// Response: GET /platform/index?where={"name":"testname"}

console.log('GET %s', showUrl)
// Response: GET /platform/show?where={"name":"testname"}

console.log('POST %s', createUrl)
// Response: POST /platform/create

console.log('PUT %s', updateUrl)
// Response: PUT /platform/show?where={"name":"testname"}

console.log('DELETE %s', deleteUrl)
// Response: DELETE /platform/show?where={"name":"testname"}

console.log('')

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

/*
  Response:

  {
    create: {
      _id: '56b60f6605e4d1667563c50c',
      name: 'testname',
    },

    find: [
      {
        _id: '56b60f6605e4d1667563c50c',
        name: 'testname',
      }
    ],

    update: {
      _id: '56b60f6605e4d1667563c50c',
      name: 'newname',
    },

    findOne: {
      _id: '56b60f6605e4d1667563c50c',
      name: 'newname',
    },

    delete: {
      _id: '56b60f6605e4d1667563c50c',
      name: 'newname',
    }
  }
 */
