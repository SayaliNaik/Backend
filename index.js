var express=require("express");
var bodyParser=require('body-parser');
var session = require('express-session');
var connection = require('./config');
var app = express();

var authenticate=require('./routes/authenticate');
var register=require('./routes/register');
var customer=require('./routes/productreg');
var support=require('./routes/request');

const TWO_HOURS = 1000*60*60*2

const SESS_NAME='sid'
const SESS_SECRET='secret'

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(session({
  name:SESS_NAME,
  resave:false,
  saveUninitialized:false,
  secret: SESS_SECRET,
  cookie:{
    maxAge: TWO_HOURS,
    sameSite: true
  }
}))

app.get('/', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})

app.get('/login.html', function (req, res) {
   res.sendFile( __dirname + "/" + "login.html" );
})

app.get('/customer.html', function (req, res) {
   res.sendFile( __dirname + "/" + "customer.html" );
})

app.get('/support.html', function (req, res) {
   res.sendFile( __dirname + "/" + "support.html" );
})


console.log(authenticate);
app.post('/routes/register', register.register);
app.post('/routes/authenticate', authenticate.authenticate);
app.post('/routes/productreg', customer.productreg);
app.post('/routes/request', support.request);
app.listen(3000);
