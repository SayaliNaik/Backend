var express = require("express");
var connection = require('./../config');

module.exports.request = function(req, res) {
        var request = {
            // "serial_number": req.body.serial_name,
            "device_id":1,
            "priority_type": req.body.priority_type,
            "description": req.body.description,
            "reportDate": req.body.reportDate,
            "user_id": 28
        }
        connection.query('INSERT INTO request SET ?',request, function (error, results, fields) {
      if (error) {
        res.json({
            message:'Cannot update your request'
        })
      }else{
          res.json({
            message:'Service request sent'
        })
      }
    });
}
