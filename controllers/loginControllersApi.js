const mysqlConnection = require("../connection.js");
var Userz = require('../models/userCompte.js');

//api ok
exports.login = function(req, res){
   var message = '';
   var sess = req.session; 
   let data = {user_name: req.body.user_name, password: req.body.password};
   var user_name = req.body.user_name;
   var password = req.body.password;
   let sql="SELECT id, first_name, last_name, user_name, isadm, email_ad FROM `utils` WHERE `user_name`='"+user_name+"' and password = '"+password+"'";                           
   let query = mysqlConnection.query(sql,(err, rows)=>{
      if(err) {        
          res.status(400).json({'message':error});
      }
      else{
          res.status(200).json({
              title :'util sélectionné',
              utils : rows
          })
      }
  });
};
//api ok        


exports.signup = function (req, res) {
    let userz = new Userz(req.body.id, req.body.first_name, req.body.last_name, req.body.email_ad, req.body.user_name, req.body.password, req.body.isadm);
    console.log(userz);
    mysqlConnection.query("INSERT INTO utils SET?", 
        userz, function (err, results) {
            if (err) {
                res.status(400).json({'message':error});
            } else {
                res.status(200).json({ 'message':'successAA' });
            }
        });
    };

//api ok
exports.profilUpdate = function (req, res) {
   const userId = req.params.userId;
   let sql = `Select * from utils where id = ${userId}`; // id = nom clé primaire dans la bd, userId est lié au server
   let query = mysqlConnection.query(sql,(err, rows)=>{
      if(err) {        
          res.status(400).json({'message':error});
      }
      else{
          res.status(200).json({
              title :'util sélectionné',
              utils : rows
          })
      }
  });
};

//API OK

exports.updateProfil = function (req, res) {
    let userz = new Userz(req.body.id, req.body.first_name, req.body.last_name, req.body.email_ad, req.body.user_name);
    console.log(userz);
    mysqlConnection.query("update utils SET first_name='"+req.body.first_name+"', last_name='"+req.body.last_name+"', email_ad='"+req.body.email_ad+"', user_name='"+req.body.user_name+"' where id ="+req.body.id,
        [userz, req.body.id], function (err, results) {
            if (err) {
                console.log(error);
                res.status(400).json({'message':error});
            } else {
                res.status(200).json({ 'message':'success' });
            }
        })
 };