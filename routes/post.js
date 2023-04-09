const express = require("express");
const postController = require("../controllers/postController");
const { check } = require('express-validator');
const { uploadImage } = require("../middlewares/multer");
const router = express.Router();
/*
    This file will help to add validation to the routes
    Validation where added in validator.js
    Cascade the required controller method
*/
router.get("/", postController.index);

/* show single post */

router.get("/:id", postController.show);

router.post("/",
    uploadImage("posts").single('image'),
    check('description','This is required field, Min lenght is 5').isLength({min:5}),
    (req, res, next) => {
        postController.save(req, res, next);
    });

router.patch("/:id",
    check('description','This is required field, Min lenght is 5').isLength({min:5}),
    (req, res, next) => {
        postController.updateDescription(req, res, next);
    });

router.delete("/:id",
    (req, res, next) => {
        postController.delete(req, res, next);
    });

module.exports = router;