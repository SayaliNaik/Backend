var bcrypt = require('bcrypt');
const saltRounds = 10;

var express=require("express");
var connection = require('./../config');


module.exports.register=function(req,res){


    //password encryption using bcrypt
    var salt = bcrypt.genSaltSync(saltRounds);
    var hash = bcrypt.hashSync(req.body.password, salt);

    var user={
        "first_name":req.body.first_name,
        "last_name":req.body.last_name,
        "email":req.body.email,
        "date_time":new Date(),
        "password":hash,
        "category_id":1  //default value of category set to general
    }
    connection.query('INSERT INTO user SET ?',user, function (error, results, fields) {
      if (error) {
        res.json({
            message:'there are some error with query'
        })
      }else{
          res.json({
            message:'user registered sucessfully'
        })
      }
    });
}
