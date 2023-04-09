const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { isEmail, hasName, hasPassword} = require("../validations/validators");
const passportJWT = require('../middlewares/passportJWT')();

router.get('/login', authController.login);
router.post('/signup',[isEmail, hasName, hasPassword], authController.signup);
router.get('/me', passportJWT.authenticate(), authController.me);

module.exports = router;
