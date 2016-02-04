'use strict'

const options = {
  baseUrl: 'http://localhost:3001'
}

const API = require('./lib/request')(options)

var query = API.find('platform').where({slug: 'npm'}).select('_id,name,slug')

console.log('URL: ', query.getUrl())

query
.send()
.then(platforms => console.log(platforms))
.catch(error => console.log(error))

API
.find('platform', 'npm')
.send()
.then(platform => console.log(platform))
.catch(error => console.log(error))
