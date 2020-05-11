const mysqlConnection = require("../connection.js");

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
exports.updateSkinApi = function (req, res) {
    const userId = req.body.id;
    let sql = "update skins SET name='"+req.body.name+"', jeu='"+req.body.jeu+"', prix='"+req.body.prix+"' where id ="+userId;
    let query = mysqlConnection.query(sql,(err, results)=>{
        if(err) {
            res.status(400).json({'message':error});
        }
        else{
            res.status(200).json({ 'message':'success' })
        }
    });
};
// ok
exports.SkinSaveApi = function (req, res) {
    let data = {name: req.body.name, jeu: req.body.jeu, prix: req.body.prix, idcateg: req.body.idcateg};
    let sql = `INSERT INTO skins SET?`;
    let query = mysqlConnection.query(sql, data,(err, results)=>{
        if(err) {
            res.status(400).json({'message':error});
        }
        else{
            res.status(200).json({ 'message':'success' })
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


