const mysqlConnection = require("../connection.js");
let Skin = require('../models/skinsmodel.js');

//ok
exports.api = function (req, res) {
    // res.send('bienvenue chez moiiii');
    let sql = "SELECT * FROM skins INNER JOIN category WHERE skins.idcateg = category.idcateg";
    let query = mysqlConnection.query(sql, (err, rows) => {
        if(err) {
            res.status(400).json({'message':error});
        }
        else{
        res.status(200).json({
            title :'Skins TEST',
            skins : rows

        })
        }
    });
};
//ok

// ok
exports.updateSkinApi = function (req, res) {
    let skin = new Skin( req.body.id, req.body.name, req.body.prix, req.body.jeu);
    console.log(skin);
    mysqlConnection.query("update skins SET name='"+req.body.name+"', jeu='"+req.body.jeu+"', prix='"+req.body.prix+"' where id ="+req.body.id,
        [skin, req.body.id], function (err, results) {
            if (err) {
                console.log(error);
                res.status(400).json({'message':error});
            } else {
                res.status(202).json({ 'message':'successe' });
            }
        })
};

exports.SkinSaveApi = function (req, res) {
    let skin = new Skin(req.body.id, req.body.name, req.body.prix, req.body.jeu, req.body.idcateg, req.body.idrare);
    console.log(skin);
    mysqlConnection.query("INSERT INTO skins SET?", 
        skin, function (err, results) {
            if (err) {
                res.status(400).json({'message':'error'});
            } else {
                res.status(200).json({ 'message':'success' });
            }
        });
    };

//ok

exports.SkinDeleteApi = function (req, res) {
    const userId = req.params.userId;
    let sql = `DELETE from skins WHERE id = ${userId}`; // id = nom clé primaire dans la bd, userId est lié au server
    let query = mysqlConnection.query(sql,(err, result)=>{
        if(err) {
            res.status(400).json({'message':error});
        }
        else{
            res.status(200).json({ 'message':'success' })
        }
    });
};
//ok
//ok
exports.SkinEditApi = function (req, res) {
    const userId = req.params.userId;
    let sql = `SELECT * FROM skins WHERE id = ${userId} `; // id = nom clé primaire dans la bd, userId est lié au server
    let query = mysqlConnection.query(sql,(err, rows)=>{
        if(err) {        
            res.status(400).json({'message':error});
        }
        else{
            res.status(200).json({
                title :'Skins TEST',
                skins : rows
            })
        }
    });
};


