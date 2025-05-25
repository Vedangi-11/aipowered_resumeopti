const express = require('express');
const { registeruser, login } = require('../controllers/usercontrollers');


const router = express.Router();

router.post('/registeruser', registeruser);
router.post('/login', login);
module.exports = router;