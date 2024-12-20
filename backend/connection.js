const mysql = require('mysql2/promise');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "uthe@rakh1Q",
    database: "task_app",
    namedPlaceholders: true
});

module.exports = connection;