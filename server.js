// const bodyParser = require('body-parser');
const express = require('express');
const {MongoClient} = require('mongodb');
const app = express();

const username = encodeURIComponent('tailsawesome1337');
const password = encodeURIComponent('tM68JrIZJj3qpyiP');

let uriConnectionString = `mongodb+srv://${username}:${password}@cluster0.ltfnp9i.mongodb.net/?retryWrites=true&w=majority`;

app.use(express.static('public'))
app.set('view engine', 'ejs');

// MongoClient.connect(uriConnectionString, (err, client) => {
//   if (err) return console.error(err);
//   console.log('Connected to Database');
// })

// app.use(bodyParser.urlencoded({ extended: true }))
//deprecated! Express has a builtin body parser now build to work exactly like the body-parser tooling
app.use(express.urlencoded());//Parse URL-encoded bodies
// app.use(bodyParser.json()) No longer needed!
//app.use(express.json()); //used to parse JSON bodies.

app.use(express.json());//Need to teach our server to accept JSON data!

//Supports promises so we can write our code like this!
MongoClient.connect(uriConnectionString)
  .then(client => {
    console.log('Connected to Database');
    const db = client.db('star-wars-quotes');
    const quotesCollection = db.collection('quotes');

    app.listen(process.env.PORT || 3000), function() {
      console.log('listening on 3000');
    };
    
    app.get('/', (req, res) => {
      // res.send('Hello World')//send method of the response object, allows us to send back a HTTP response. In this case a string of Hello World
      // res.sendFile(__dirname + '/index.html')
      //allows you to transfer files across the web, will automagically set the Content-Type header field on the response object.
      //__dirname is the current directory we are in
      // console.log(__dirname);
      db.collection('quotes')
        .find()
        .toArray()
        .then(results => {
          res.render('index.ejs', { quotes: results });
        })
        .catch(error => console.error(error));
    })

    app.put('/quotes', (req, res) => {
      console.log(req.body);
      quotesCollection
        .findOneAndUpdate({ name: 'Yoda'},//query
        {//update
          $set: {
            name: req.body.name,
            quote: req.body.quote,
          },
        },
        {
          //options
          upsert: true,
        })
        .then(result => {
          res.json('Success');
          console.log(result);
        })
        .catch(error => console.error(error));
    })
    
    app.post('/quotes', (req, res) => {
      quotesCollection
        .insertOne(req.body)
        .then(result => {
          res.redirect('/');
          console.log(result);
        })
        .catch(error => console.error(error));
    });
    
    app.delete('/quotes', (req, res) => {
      quotesCollection
        .deleteOne({ name: 'Darth Vader' })
        .then(result => { 
          if (result.deletedCount === 0) {
            return res.json('No quote to delete!');
          }
          res.json('Deleted Darth Vader\'s quote');
        })
        .catch(err => console.error(err));
    })
  })
  .catch(error => console.error(error));


