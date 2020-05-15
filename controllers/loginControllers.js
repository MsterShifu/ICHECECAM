const mysqlConnection = require("../connection.js");
var Userz = require('../models/userCompte.js');

// POUR SE CONNECTER AU SITE WEB PAR SESSION
exports.login = function(req, res){
   var message = '';
   var sess = req.session; 
   let data = {user_name: req.body.user_name, password: req.body.password};
   var user_name = req.body.user_name;
   var password = req.body.password;
   let sql="SELECT id, first_name, last_name, user_name, isadm, email_ad FROM `utils` WHERE `user_name`='"+user_name+"' and password = '"+password+"'";                           
   let query = mysqlConnection.query(sql, data,(err, results)=>{      
          if(results.length){
             req.session.userId = results[0].id;
             req.session.isadm = results[0].isadm;
             req.session.user = results[0];
             console.log(results[0].id);
             res.redirect('/');
             message = 'Login réussi !';
          }
          else{
             message = 'Mauvaises informations.';
             res.render('index.ejs',{message: message});
          };
      });
};

//POUR SE DIRIGER VERS LA PAGE DE LOGIN
exports.loginNow = function(req, res){
   res.render('index.ejs', {
      message : "Connectez-vous"
   });
};

// POUR S'INSCRIRE SUR LE SITE WEB
exports.signup = function (req, res) {
   let userz = new Userz(req.body.id, req.body.first_name, req.body.last_name, req.body.email_ad, req.body.user_name, req.body.password, req.body.isadm);
   console.log(userz);
   mysqlConnection.query("INSERT INTO utils SET?", 
       userz, function (err, results) {
           if (err) {
               res.status(400).send(error);
           } else {
               res.status(200).redirect('/');
           }
       });
   };
// POUR AFFICHER LA PAGE D'INSCRIPTION
exports.signupNow = function(req, res){
   res.render('regist.ejs', {
      message : "Inscrivez-vous"
   });
};

// POUR SE DECONNECTER DU SITE WEB
exports.logout = function(req,res){    
   req.session.destroy(function(err){  
       if(err){  
           console.log(err);  
       }  
       else  
       {  
           res.redirect('/');  
       }  
   });  
 };  
// POUR AFFICHER LES INFORMATIONS DE SON PROFIL ET LES MODIFIER
exports.profilUpdate = function (req, res) {
   const userId = req.params.userId;
   let sql = `Select * from utils where id = ${userId}`; // id = nom clé primaire dans la bd, userId est lié au server
   let query = mysqlConnection.query(sql,(err, result)=>{
       if(err) throw err;
       res.render('profilupdate.ejs',{
           title : 'Modifiez vos informations personnelles',
           user : result[0]
       });
   });
};

// POUR UPDATE LES INFORMATIONS DU PROFIL
exports.updateProfil = function (req, res) {
   let userz = new Userz(req.body.id, req.body.first_name, req.body.last_name, req.body.email_ad, req.body.user_name);
   console.log(userz);
   mysqlConnection.query("update utils SET first_name='"+req.body.first_name+"', last_name='"+req.body.last_name+"', email_ad='"+req.body.email_ad+"', user_name='"+req.body.user_name+"' where id ="+req.body.id,
       [userz, req.body.id], function (err, results) {
           if (err) {
               console.log(error);
               res.status(400).send(error);
           } else {
               res.status(202).redirect('/profil');
           }
       })
};

//POUR AFFICHER LE PROFIL 

exports.profil = function(req, res, next){
	var user =  req.session.user,
	userId = req.session.userId;
	
	if(userId == null){
		res.redirect("/login/now");
		return;
	}
	 
	 let sql="SELECT * FROM `utils` WHERE `id`='"+userId+"'";
	 
	   mysqlConnection.query(sql, function(err, results){
		   
		   console.log(results);
		   
		   res.render('profile.ejs', {user:user});	  
		  
		});	 
};

