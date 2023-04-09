const { body,check  } = require('express-validator');

exports.isEmail =  body('email')
            .isEmail()
            .withMessage("Email field should have correct email address");

exports.hasPassword =  body('password')
            .exists()
            .withMessage("password field should not be empty");

exports.hasName =  body('name')
            .isLength({ min: 5})
            .withMessage("Name is required. Min Length is 5");


exports.description =  body('description')
            .isLength({ min: 5})
            .withMessage("Description is required. Min Length is 5");