const mysqlConnection = require("../connection.js");

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
 exports.signup = function(req, res){
   let data = {user_name: req.body.user_name, password: req.body.password, first_name: req.body.first_name, last_name: req.body.last_name, email_ad: req.body.email_ad, isadm: req.body.isadm};
   let sql = "INSERT INTO utils SET ?";      
   let query = mysqlConnection.query(sql, data,(err, result)=>{
      if(err) {
         res.status(400).json({'message':error});
     }
     else{
         res.status(200).json({ 'message':'success' })
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

exports.updateProfil = function (req, res) {
   const userId = req.body.id;
   let sql = "update utils SET first_name='"+req.body.first_name+"', last_name='"+req.body.last_name+"', email_ad='"+req.body.email_ad+"', user_name='"+req.body.user_name+"' where id ="+userId;
   let query = mysqlConnection.query(sql,(err, results)=>{
      if(err) {
          res.status(400).json({'message':error});
      }
      else{
          res.status(200).json({ 'message':'success' })
      }
  });
};


