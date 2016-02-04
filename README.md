# The project is under development

## Configure

Options are the same as for the package [request](https://www.npmjs.com/package/request#requestoptions-callback) because it is used in the method `.exec()` under the hood.

```javascript
const options = {
  baseUrl: 'http://localhost:3001'
}

const API = require('rest-api-request')(options)

const Platform = API.model('platform')
```


#### GET [/platform?where={"slug":"npm"}&select=name&limit=2](/platform?where={"slug":"npm"}&select=name&limit=2)

```javascript
let query = Platform.find({slug: 'npm'}).select('name').limit(2).exec()

query.then(platforms => console.log(platforms))
// response: [ { _id: '56b2ab8708a3b0fa3e813b6a', name: 'NPM' } ]
```

#### GET [/platform/npm?select=name](/platform/npm?select=name)

```javascript
let query = Platform.findOne('npm').select('name').exec()

query.then(platform => console.log(platform))
// response: [ { _id: '56b2ab8708a3b0fa3e813b6a', name: 'NPM' } ]
```

#### Error handlers

```javascript
query.catch(error => console.log(error))
// response: { error: { message: "Error text" } }
```

#### Build url string without request

If you do not want to use the package [request](https://www.npmjs.com/package/request#requestoptions-callback) for api calls, you can get the URL address as a string, without sending a request to the API server.

``` javascript
let query = Platform.find({slug: 'npm'}).select('name').limit(2).offset(10)
let url = query.getUrl()
```

Now variable `url` contains the string:

```
/platform?where={"slug":"npm"}&select=name&limit=2&offset=10
```



