# Rest-api-request


[![npm package](https://nodei.co/npm/rest-api-request.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/rest-api-request/)

[![Tutorials](https://img.shields.io/badge/tutorials-999%2B-brightgreen.svg)](https://libtuts.com/npm/rest-api-request)
[![NPM version](http://img.shields.io/npm/v/rest-api-request.svg)](https://www.npmjs.org/package/rest-api-request)
[![Dependency Status](https://david-dm.org/kulakowka/rest-api-request.svg)](https://david-dm.org/kulakowka/rest-api-request)
[![devDependency Status](https://david-dm.org/kulakowka/rest-api-request/dev-status.svg)](https://david-dm.org/kulakowka/tracer#info=devDependencies)


## Install

```
npm install rest-api-request --save
```

# Full example

```javascript
'use strict'

const async = require('async')

// Request options
const options = {
  baseUrl: 'http://localhost:3001'
}

const API = require('rest-api-request')(options)

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

// Testing CRUD with real API server

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
```

## Configure

Options are the same as for the package [request](https://www.npmjs.com/package/request#requestoptions-callback) because it is used in the method `.exec()` under the hood.

```javascript
const options = {
  baseUrl: 'http://localhost:3001'
}

const API = require('rest-api-request')(options)

const User = API.model('user')
```

## Build url string without request

If you do not want to use the package [request](https://www.npmjs.com/package/request#requestoptions-callback) for api calls, you can get the URL address as a string, without sending a request to the API server.

``` javascript
let query = User.findOne({name: 'user1'}).select('name,type').limit(2).offset(10)
let url = query.getUrl()
```

Now variable `url` contains the string:

```
/user/show?where={"name":"user1"}&select=name,type&limit=2&offset=10
```



# Methods

### find()

```javascript

Model.find({name: 'admin'}).getUrl()
Model.find().where({name: 'admin'}).getUrl()
/*
  Response: /user/index?where={"name":"admin"}
*/

Model.find().select('name,email').getUrl()
/*
  Response: /user/index?select=name,email
*/

Model.find().populate('comments,keywords').getUrl()
Model.find().populate(['comments','keywords']).getUrl()
/*
  Response: /user/index?populate=comments,keywords
*/

Model.find().sort('-name,createdAt').getUrl()
/*
  Response: /user/index?sort=-name,createdAt
*/

Model.find().sort({name: -1, createdAt: 1}).getUrl()
/* 
  Response: /user/index?sort={"name":-1,"createdAt":1}
*/

Model.find().limit(10).getUrl()
/* 
  Response: /user/index?limit=10

*/

Model.find().offset(10).getUrl()
/*
  Response: /user/index?offset=10
*/
```

### findOne()

```javascript

Model.findOne({name: 'admin'}).getUrl()
Model.findOne().where({name: 'admin'}).getUrl()
/*
  Response: /user/show?where={"name":"admin"}
*/

Model.findOne({name: 'admin'}).select('name,email').getUrl()
/*
  Response: /user/show?where={"name":"admin"}&select=name,email
*/

Model.findOne({name: 'admin'}).populate('comments,keywords').getUrl()
Model.findOne({name: 'admin'}).populate(['comments','keywords']).getUrl()
/*
  Response: /user/show?where={"name":"admin"}&populate=comments,keywords
*/
```

### create()

```javascript

Model.create({name: 'admin'}).getUrl()

/*
  Response: /user/create
*/
```

### update()

```javascript

Model.update({name: 'admin'}, {name: 'new name'}).getUrl()

/*
  Response: /user/update?where={"name":"admin"}
*/
```

### delete()

```javascript

Model.delete({name: 'admin'}).getUrl()

/*
  Response: /user/delete?where={"name":"admin"}
*/
```

# Error handlers

```javascript
let query = User.findOne({name: 'user1'}).select('name,type').exec()

query.catch(error => console.log(error))

/* 
  Response:
  { 
    error: { 
      message: "Error text from api server" 
    } 
  }
*/
```

## More examples

#### GET [/user/index?where={"type":"moderator"}&select=name,type&limit=2](/user/index?where={"type":"moderator"}&select=name,type&limit=2)

```javascript
let query = User.find({type: 'moderator'}).select('name,type').limit(2).exec()

query.then(response => console.log(response))

/* 
  Response: 
  [ 
    { 
      _id: '56b2ab8708a3b0fa3e813b6a', 
      name: 'user1', 
      type: 'moderator' 
    }, 
    { 
      _id: '56b60ef005e4d1667563c50b', 
      name: 'user2', 
      type: 'moderator' 
    } 
  ]
*/
```

#### GET [/user/show?where={"name":"user1"}&select=name,type](/user/show?where={"name":"user1"}&select=name,type)

```javascript
let query = User.findOne({name: 'user1'}).select('name,type').exec()

query.then(response => console.log(response))

/* 
  Response: 
  { 
    _id: '56b2ab8708a3b0fa3e813b6a', 
    name: 'user1', 
    type: 'moderator' 
  }
*/
```
