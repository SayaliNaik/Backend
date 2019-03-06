var express=require("express");
var bodyParser=require('body-parser');
var session = require('express-session');
var connection = require('./config');
var cookieParser = require('cookie-parser');
var passport =require('passport');
var LocalStrategy = require('passport-local').Strategy;
// var exphbs = require('express-handlebars');
var flash = require('connect-flash');
var app = express();

var authenticate=require('./routes/authenticate');
var register=require('./routes/register');
var customer=require('./routes/productreg');
var support=require('./routes/request');

// const TWO_HOURS = 1000*60*60*2
//
// const SESS_NAME='sid'
// const SESS_SECRET='secret'

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(session({
  secret: "secret",
  resave:false,
  saveUninitialized:true
}));

app.use(flash());

app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

//
// app.use(session({
//   name:SESS_NAME,
//   resave:false,
//   saveUninitialized:false,
//   secret: SESS_SECRET,
//   cookie:{
//     maxAge: TWO_HOURS,
//     sameSite: true
//   }
// }))


// function checkSignIn(req, res){
//    if(req.session.user){
//       next();     //If session exists, proceed to page
//    } else {
//       var err = new Error("Not logged in!");
//       console.log(req.session.user);
//       next(err);  //Error, trying to access unauthorized page!
//    }
// }


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

app.get('/dashboard.html', function (req, res) {
   res.sendFile( __dirname + "/" + "dashboard.html" );
})



// Logout endpoint
app.get('/logout', function (req, res) {
  req.session.destroy();
  res.send("logout success!");
});

// app.get('/dashboard.html', checkSignIn, function(req, res){
//    res.render('dashboard.html', {id: req.session.user.id})
// });
//
// app.use('/dashboard.html', function(err, req, res, next){
// console.log(err);
//    //User should be authenticated! Redirect him to log in.
//    res.redirect('/login.html');
// });



console.log(authenticate);
app.post('/routes/register', register.register);
app.post('/routes/authenticate', authenticate.authenticate);
app.post('/routes/productreg', customer.productreg);
app.post('/routes/request', support.request);

app.listen(3000);
