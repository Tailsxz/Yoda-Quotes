const express = require('express');
const bodyParser = require('body-parser');
const app = express();

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
});