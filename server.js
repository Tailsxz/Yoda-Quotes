// const bodyParser = require('body-parser');
const express = require('express');
const {MongoClient} = require('mongodb');
const app = express();

const username = encodeURIComponent('tailsawesome1337');
const password = encodeURIComponent('tM68JrIZJj3qpyiP')

let uriConnectionString = `mongodb+srv://${username}:${password}@cluster0.ltfnp9i.mongodb.net/?retryWrites=true&w=majority`

// MongoClient.connect(uriConnectionString, (err, client) => {
//   if (err) return console.error(err);
//   console.log('Connected to Database');
// })

//Supports promises so we can write our code like this!
MongoClient.connect(uriConnectionString)
  .then(client => {
    console.log('Connected to Database');
  })
  .catch(error => console.error(error));

// app.use(bodyParser.urlencoded({ extended: true }))
//deprecated! Express has a builtin body parser now build to work exactly like the body-parser tooling
app.use(express.urlencoded())//Parse URL-encoded bodies
// app.use(bodyParser.json()) No longer needed!
//app.use(express.json()); //used to parse JSON bodies.

app.listen(process.env.PORT || 3000), function() {
  console.log('listening on 3000');
};

app.get('/', (req, res) => {
  // res.send('Hello World')//send method of the response object, allows us to send back a HTTP response. In this case a string of Hello World
  res.sendFile(__dirname + '/index.html')
  //allows you to transfer files across the web, will automagically set the Content-Type header field on the response object.
  //__dirname is the current directory we are in
  console.log(__dirname);
})

app.post('/quotes', (req, res) => {
  console.log('Helloooooooooooo!');
  console.log(req.body);
});
