'use strict'

// Request options
const options = {
  baseUrl: 'http://localhost:3333'
}

const API = require('../lib/request')(options)

// Define model

const Model = API.model('test')

// Testing method .getUrl()

module.exports.indexUrl = Model.find({name: 'testname'}).getUrl()
module.exports.showUrl = Model.findOne({name: 'testname'}).getUrl()
module.exports.createUrl = Model.create().getUrl()
module.exports.updateUrl = Model.update({name: 'testname'}, {name: 'new name'}).getUrl()
module.exports.deleteUrl = Model.delete({name: 'testname'}).getUrl()

