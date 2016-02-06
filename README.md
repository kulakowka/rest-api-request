# The project is under development

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

#### Error handlers

```javascript
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

#### Build url string without request

If you do not want to use the package [request](https://www.npmjs.com/package/request#requestoptions-callback) for api calls, you can get the URL address as a string, without sending a request to the API server.

``` javascript
let query = User.findOne({name: 'user1'}).select('name,type').limit(2).offset(10)
let url = query.getUrl()
```

Now variable `url` contains the string:

```
/user/show?where={"name":"user1"}&select=name,type&limit=2&offset=10
```

