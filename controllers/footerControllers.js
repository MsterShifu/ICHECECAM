const mysqlConnection = require("../connection.js");

// VERS LA PAGE INFORMATIONS LEGALES
exports.infoleg = function (req, res) {
    res.render('infoleg.ejs', {
        title : "Voici nos informations légales"
    });
};