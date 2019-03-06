var express=require("express");
var bodyParser=require('body-parser');
var session = require('express-session');
var connection = require('./config');
var app = express();

var authenticate=require('./routes/authenticate');
var register=require('./routes/register');
var customer=require('./routes/productreg');
var support=require('./routes/request');

app.use(session({
  secret:'secret',
  resave:true,
  saveUninitalized:true
}))

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// app.use(function(req, res, next) {
//   res.locals.success_msg = req.flash('success_msg');
//   res.locals.error_msg = req.flash('error_msg');
//   res.locals.error = req.flash('error');
//   next();
// });

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
  if(req.session.loggedin){
   res.sendFile( __dirname + "/" + "dashboard.html" );

 }else{
   res.json({
       status:false,
       message:'GET OUT'

   })
 }

})


// Logout endpoint
app.get('/logout', function (req, res) {
  req.session.destroy();
  res.redirect('/login.html')
});


console.log(authenticate);
app.post('/routes/register', register.register);
app.post('/routes/authenticate', authenticate.authenticate);
app.post('/routes/productreg', customer.productreg);
app.post('/routes/request', support.request);

app.listen(3000);
