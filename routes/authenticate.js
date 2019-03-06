var express=require("express");
var router=express.Router();
var passport =require('passport');
var LocalStrategy = require('passport-local').Strategy;

var bcrypt = require('bcrypt');
var salt = 10;

var connection = require('./../config');

module.exports.authenticate=function(req,res){
    var email=req.body.email;
    var password=req.body.password;


    connection.query('SELECT * FROM user WHERE email = ?',[email], function (error, results, fields) {
      if (error) {
          res.json({
            status:false,
            message:'there are some error with query'
            })
      }else{
        if(results.length >0){
          decrypted=bcrypt.compareSync(password, results[0].password)
              if(decrypted){

                // res.json({
                //     status:true,
                //     message:'successfully authenticated'
                //
                // })
                req.session.loggedin=true;
                req.session.user_id=results[0].user_id;
                res.redirect('http://localhost:3000/dashboard.html')
            }else{
                // res.json({
                //     status:false,
                //     message:"Email and password does not match"
                //  });
                res.redirect('http://localhost:3000/login.html')
            }
        }
        else{
          res.json({
              status:false,
            message:"Email does not exits"
          });
        }
      }
    });
}
