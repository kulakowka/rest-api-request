'use strict'

module.exports = require('./lib/request')

// const RequestAPI = require('./lib/request')

// const options = {
//   baseUrl: 'http://localhost:3001'
// }

// const apiRequest = require('./lib/request')(options)

// apiRequest
//   .where({slug: 'npm'})
//   .select(['_id', 'name', 'slug'])
//   // .select('_id,name,slug')
//   .populate('articles')
//   .limit(10)
//   .offset(10)
//   .find('platform')
//   .then(platforms => console.log(platforms))
//   .catch(error => console.log(error))

// apiRequest
  // .where({slug: 'npm'})
  // .select(['_id', 'name', 'slug'])
  // .select('name')
  // .populate('articles')
  // .limit(10)
  // .offset(10)
  // .find('platform', 'npm')
  // .then(platform => console.log(platform))
  // .catch(error => console.log(error))

// apiRequest
  // .where({slug: 'npm'})
  // .select(['_id', 'name', 'slug'])
  // .select('name')
  // .populate('articles')
  // .limit(10)
  // .offset(10)
  // .find('platform', 'rubygems')
  // .then(platform => console.log(platform))
  // .catch(error => console.log(error))

// new ApiRequest()
//   .where({slug: 'npm'})
//   .select('_id,name,slug')
//   .populate('articles')
//   .findOne('platform')
//     // .then(platform => console.log(platform))
