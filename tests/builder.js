'use strict'

const async = require('async')

// Request options
const options = {
  baseUrl: 'http://localhost:3333'
}

const API = require('../lib/request')(options)

// Define model

const Model = API.model('test')

let testQuery = Model.find({name: 'kulakowka'})
                
                // Add where
                .where({isAdmin: true})
                .where({gender: 'female'})

                // Populate example

                .populate('comments')
                .populate('user', 'name fullname') // only return the Persons name
                .populate({
                  path: 'owner',
                  select: 'name',
                  match: { 
                    color: 'black' 
                  },
                  options: { 
                    sort: { 
                      name: -1 
                    }
                  }
                })
                .populate('car1   car2    car3')

                // Select example

                .select('name age +notselected')
                .select('name age -password')
                .select({
                  name: 1, 
                  user: 1, 
                  source: -1
                })

                // Sort example
                
                // .sort('-createdAt -name')
                .sort({ createdAt: -1, name: -1 })
                
                // Limit
                
                .limit(10)
                  
                // skip
                
                .skip(10)


module.exports.getUrl = () =>  testQuery.getUrl()

module.exports.makeRequest = () => testQuery.exec().then(console.log).catch(console.log)
