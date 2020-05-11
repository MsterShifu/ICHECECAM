const mysqlConnection = require("../connection.js");


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
               
exports.loginNow = function(req, res){
   res.render('index.ejs', {
      message : "Connectez-vous"
   });
};

 exports.signup = function(req, res){
   let data = {user_name: req.body.user_name, password: req.body.password, first_name: req.body.first_name, last_name: req.body.last_name, email_ad: req.body.email_ad, isadm: req.body.isadm};
   let sql = "INSERT INTO utils SET ?";      
   let query = mysqlConnection.query(sql, data,(err, result)=>{
      if(err) throw err;
      res.redirect('/');
  });
};

exports.signupNow = function(req, res){
   res.render('regist.ejs', {
      message : "Inscrivez-vous"
   });
};


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
//test
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

exports.updateProfil = function (req, res) {
   const userId = req.body.id;
   let sql = "update utils SET first_name='"+req.body.first_name+"', last_name='"+req.body.last_name+"', email_ad='"+req.body.email_ad+"', user_name='"+req.body.user_name+"' where id ="+userId;
   let query = mysqlConnection.query(sql,(err, results)=>{
       if(err) throw err;
       res.redirect('/profil');
   });
};







//test
exports.index = function(req, res){
    var message = '';
  res.render('index',{message: message})};

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

