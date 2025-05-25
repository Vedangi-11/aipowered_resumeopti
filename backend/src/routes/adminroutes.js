const express = require('express');
const { registerAdmin, adminlogin } = require('../controllers/admin/admincontroller');


const router = express.Router();

router.post('/registeradmin', registerAdmin);
router.post('/login', adminlogin);
module.exports = router;