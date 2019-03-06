var express = require("express");
var connection = require('./../config');

module.exports.productreg = function(req, res) {
        var company = {
            "company_name": req.body.company_name,
            "street1": req.body.street1,
            "street2": req.body.street2,
            "city": req.body.city,
            "state": req.body.state,
            "country_name": "United States"
        }
        var abc="hello";
        connection.query('INSERT INTO company SET ?', company, function(error, results, fields) {
                if (error) {
                    res.json({
                        // status:false,
                        error: error,
                        message: 'there are some errors with query!!'
                    })
                } else {
                    connection.query('SELECT * FROM company WHERE company_name = ?', [req.body.company_name], function(error, results1, fields) {
                            if (error) {
                                res.json({
                                    status: false,
                                    message: 'Cannot update Company'
                                })

                            } else {
                                if (results1.length > 0) {
                                    var customers = {
                                        "serial_number": req.body.serial_number,
                                        "company_id": results1[0].company_id,
                                        "job_title": "Engineer",
                                        "user_id": req.session.user_id
                                    }
                                    connection.query('INSERT INTO customers SET ?', customers, function(error, results2, fields) {
                                        if (error) {
                                            res.json({
                                                status: false,
                                                message: 'Cannot update Customers'
                                            })
                                        } else {
                                            var device = {
                                                "serial_number": req.body.serial_number,
                                                "category_id": 1,
                                                "user_id": req.session.user_id,
                                                "purchase_date": req.body.purchase_date
                                            }
                                            connection.query('INSERT INTO device SET ?', device, function(error, results3, fields) {
                                                if (error) {
                                                    res.json({
                                                        status: false,
                                                        message: 'Cannot update device data'
                                                    })
                                                } else {
                                                  res.json({
                                                      status: true,
                                                      message: 'horray'
                                                  })
                                                }
                                            });

                                        }
                                    });
                                }
                                else {
                                  res.json({
                                      status: false,
                                      message: 'ERROR'
                                  })
                                }
                            }});
                    }
                });
        }
