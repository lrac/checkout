const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const axios = require('axios');

// This will set express to render our views folder, then to render the files as normal html
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.static(path.join(__dirname, './views')));

// Future Code Goes Here

const port = process.env.PORT || 1000;
app.listen(port, () => console.log('Server is running...'));

var hello = JSON.stringify(require('./pr'));

app.get('/checkout', async function(req, res){
  res.render('ck.html', {prueba: hello})
})
