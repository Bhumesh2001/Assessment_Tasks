const { connection } = require('../models/model');

exports.autorizePermission = async (req, res, next) => {
    try {
        const sql = `SELECT * FROM ${process.env.TABLE_NAME} WHERE email = '${req.body.email}';`;
        connection.query(sql, (err, result) => {
            if(err) throw err;
            if(result[0].role !== 'admin'){
                return res.status(401).send({
                    success: false,
                    message: 'You are not allowed to login from here',
                });
            };
            next();
        });
    } catch (error) {
        res.status(500).send({
            error,
            message: 'error from middleware'
        });
    };
};