const { connection } = require('../models/model');

exports.CustomerRegistration = (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        let role = 'customer';
        const sql = `INSERT INTO ${process.env.TABLE_NAME} (firstName, lastName, email, password, role)
        VALUES (?,?,?,?,?)`;
        const values = [firstName, lastName, email, password, role];

        connection.query(sql, values, (err, result) => {
            if (err) {
                return res.status(500).send({
                    success: false,
                    err
                });
            };
            return res.status(201).send({
                success: true,
                message: 'Registration successful...',
                insertId: result.insertId,
            });
        });

    } catch (error) {
        return res.status(500).send({
            statusCode: 500,
            success: false,
            error
        });
    };
};

exports.AdminRegistration = (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        let role = 'admin';
        const sql = `INSERT INTO ${process.env.TABLE_NAME} (firstName, lastName, email, password, role)
        VALUES (?,?,?,?,?)`;
        const values = [firstName, lastName, email, password, role];

        connection.query(sql, values, (err, result) => {
            if (err) {
                return res.status(500).send({
                    success: false,
                    err
                });
            };
            return res.status(201).send({
                success: true,
                message: 'Registration successful...',
                insertId: result.insertId,
            });
        });

    } catch (error) {
        return res.status(500).send({
            statusCode: 500,
            success: false,
            error
        });
    };
};

// login the admin 

exports.adminLogin = async (req, res) => {
    try {
        const { password } = req.body;
        const sql = `SELECT * FROM ${process.env.TABLE_NAME} WHERE email = '${req.body.email}';`;
        connection.query(sql, (err, result) => {
            if (err) {
                return res.status(500).send({
                    success: false,
                    err
                });
            };
            if (!result) {
                return res.status(404).send({
                    success: false,
                    message: 'User not found',
                });
            };
            if (result[0].password !== password) {
                return res.status(401).send({
                    success: false,
                    message: 'Email or Password are wrong!',
                });
            };
            res.status(200).send({
                success: true,
                message: 'logged in successful...',
            });
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    };
};

// rendering file

exports.renderCustomerPage = (req, res) => {
    try {
        res.render('customer');
    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    };
};

exports.renderAdminPage = (req, res) => {
    try {
        res.render('admin');
    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    };
};

exports.renderAdminLoginPage = (req, res) => {
    try {
        res.render('admin_login');
    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    };
};