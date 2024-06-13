const mysql = require('mysql');

const db_name = process.env.DB_NAME;
const table_name = process.env.TABLE_NAME;

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
});

const createDBquery = `CREATE DATABASE IF NOT EXISTS ${db_name}`;
const createTableQuery = `
    CREATE TABLE IF NOT EXISTS ${table_name} (
        id INT AUTO_INCREMENT PRIMARY KEY,
        firstName VARCHAR(255) NOT NULL,
        lastName VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(255) NOT NULL,
        created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`;

connection.connect((err) => {
    if(err) throw err;
    connection.query(createDBquery, (err) => {
        if(err) throw err;
        console.log(`\nDatabase created or If exists will use it.`);
    });
    connection.query(`USE ${db_name}`, (err) => {
        if(err) throw err;
        console.log(`Using ${db_name}`);
    });
    connection.query(createTableQuery, (err) => {
        if(err) throw err;
        console.log(`Table created or If exists will use it.\n`);
    });
});

module.exports = { connection };