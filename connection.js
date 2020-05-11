const mysql = require("mysql");

var mysqlConnection = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "0000",
    database : "test_crud",
    multipleStatements : true
});

mysqlConnection.connect((err)=>{
    if(!err)
        {
            console.log("Database connected <3");
        }
    else   
        {
            console.log("Something went wrong with the database :( ");
        }
})

module.exports = mysqlConnection;