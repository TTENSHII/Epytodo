const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.APP_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err);
        return;
    }
    console.log(`connected as : ${connection.config.user} | id is : ${connection.threadId}`);
})

module.exports = connection;
