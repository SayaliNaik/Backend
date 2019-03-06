var bcrypt = require('bcrypt');
var salt = 10;

var connection = require('./../config');
module.exports.authenticate=function(req,res){
    var email=req.body.email;
    var password=req.body.password;

    // passport.use(new LocalStrategy(
    //   function(email, password, done) {
    //     User.findOne({ email: email }, function (err, user) {
    //       if (err) { return done(err); }
    //       if (!user) { return done(null, false); }
    //       if (!user.verifyPassword(password)) { return done(null, false); }
    //       return done(null, user);
    //     });
    //   }
    // ));


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
