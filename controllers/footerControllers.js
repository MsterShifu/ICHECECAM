const mysqlConnection = require("../connection.js");

exports.infoleg = function (req, res) {
    res.render('infoleg.ejs', {
        title : "Voici nos informations légales"
    });
};