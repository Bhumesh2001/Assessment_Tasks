require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const PORT = process.env.PORT || 3000;
const app = express();
const routes = require('./routes/router');

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));
app.use(express.static(__dirname + '/public'));

app.use('/', routes);

app.listen(PORT, () => {
    console.log(`\nServer listening on this http://localhost:${PORT}\n`);
    console.log(`Go for register customer => http://localhost:${PORT}/register/customer`);
    console.log(`Go for register admin => http://localhost:${PORT}/register/admin`);
    console.log(`Go for login admin => http://localhost:${PORT}/admin/login`);
});