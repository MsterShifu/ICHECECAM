const mysqlConnection = require("../connection.js");

exports.updateSkin = function (req, res) {
    const userId = req.body.id;
    let sql = "update skins SET name='"+req.body.name+"', jeu='"+req.body.jeu+"', prix='"+req.body.prix+"' where id ="+userId;
    let query = mysqlConnection.query(sql,(err, results)=>{
        if(err) throw err;
        res.redirect('/');
    });
};

exports.mainrender = function (req, res) {
    // res.send('bienvenue chez moiiii');
    let sql = "SELECT * FROM skins INNER JOIN category ON category.idcateg = skins.idcateg INNER JOIN rare ON rare.idRare = skins.idrare";
    let query = mysqlConnection.query(sql, (err, rows) => {
        if(req.session.isadm === 'Admin')
        res.render('admin.ejs', {
            title : 'Skins Farmerzzzzzzzz',
            skins : rows
        });
        else{
        res.render('user_index.ejs', {
            title :'Skins TEST',
            skins : rows

        })
        }
    });
};



//test
//exports.categ = function (req, res) {
//    let sql = "SELECT * FROM test_crud.category";
 //   let query = mysqlConnection.query(sql, (err, rows) => {
 //       if(err) throw err;
//        res.render('categ', {
//            title : 'Skins Farmerzzzzzzzz',
//            category : rows //important les rows
//        });
//    });
//};
//test


exports.SkinAdd = function (req, res) {
    res.render('skin_add', {
        title : "Vendre un skin sur le marché communautaire"
    });
};

exports.SkinSave = function (req, res) {
    let data = {name: req.body.name, jeu: req.body.jeu, prix: req.body.prix, idcateg: req.body.idcateg, idrare: req.body.idrare};
    let sql = "INSERT INTO skins SET?";
    let query = mysqlConnection.query(sql, data,(err, results)=>{
        if(err) throw err;
        res.redirect('/');
    });
};

exports.SkinEdit = function (req, res) {
    const userId = req.params.userId;
    let sql = `SELECT * FROM skins WHERE id = ${userId} `; // id = nom clé primaire dans la bd, userId est lié au server
    let query = mysqlConnection.query(sql,(err, result)=>{
        if(err) throw err;
        res.render('skin_edit',{
            title : 'Skins Farmez',
            user : result[0]
        });
    });
};

exports.SkinDelete = function (req, res) {
    const userId = req.params.userId;
    let sql = `DELETE from skins WHERE id = ${userId}`; // id = nom clé primaire dans la bd, userId est lié au server
    let query = mysqlConnection.query(sql,(err, result)=>{
        if(err) throw err;
        res.redirect('/');
    });
};

exports.SkinGet = function (req, res) {
    const userId = req.params.userId;
    let sql = `Select * from skins WHERE id = ${userId}`; // id = nom clé primaire dans la bd, userId est lié au server
    let query = mysqlConnection.query(sql,(err, result)=>{
        if(err) throw err;
        res.render('skin_page',{
            title : 'Skins Farmez',
            user : result[0]
        });
    });
};

exports.cart = function (req, res) {
    res.render('cart', {
        title : 'cart',
    } )
}; 

