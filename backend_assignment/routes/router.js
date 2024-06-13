const express = require('express');
const router = express.Router();
const {
    renderCustomerPage,
    CustomerRegistration,
    renderAdminPage,
    AdminRegistration,
    renderAdminLoginPage,
    adminLogin,
} = require('../controllers/controller');
const { autorizePermission } = require('../middleware/middleware');

router
    .route('/register/customer')
    .get(renderCustomerPage)
    .post(CustomerRegistration)

router
    .route('/register/admin')
    .get(renderAdminPage)
    .post(AdminRegistration)

router
    .route('/admin/login')
    .get(renderAdminLoginPage)
    .post(
        autorizePermission,
        adminLogin
    )

module.exports = router;