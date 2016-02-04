'use strict'

const options = {
  baseUrl: 'http://localhost:3001'
}

const API = require('./lib/request')(options)

const Platform = API.model('platform')

Platform.find({slug: 'npm'}).select('name').limit(2).exec()
.then(platforms => console.log(platforms))
.catch(error => console.log(error))

Platform.findOne('npm').select('name').exec()
.then(platform => console.log(platform))
.catch(error => console.log(error))

let url = Platform.find({slug: 'npm'}).select('name').limit(2).offset(10).getUrl()
console.log(url)
