const jwt = require("jwt-simple");
const config = require("../config");

const { User } = require("../models/user.model");

const validationHandler = require("../validations/validationHandler");

exports.login = async(req, res, next) => {

    try {
        validationHandler(req);
        const reqemail = req.body.email;
        
        const reqPassword = req.body.password;
       
        const user = await User.findOne({ email: reqemail }).select('+password');

        if(!user){
            const error = new Error("Wrong email ID");
            error.statusCode = 401;
            throw error;
        }

        const validPassword = await user.validPassword(reqPassword, user.password);
        if(!validPassword){
            const error = new Error("Wrong password");
            error.statusCode = 401;
            throw error;
        }
        const { id, name, email } = user;
        const token = jwt.encode({ id : id}, config.jwtSecret);
        console.log(user);
        return res.send({
            id,
            name, 
            email,
            token
        });
    } catch (error) {
        next(error);
    }

};

exports.signup = async( req, res, next ) => {
    try {
        validationHandler(req);
        const existingUser =   await User.findOne({ email: req.body.email });
        if(existingUser){
            const error = new Error("Email already used");
            error.statusCode = 403;
            throw error;        
        }

        let user = new User();
        user.email = req.body.email;
        user.name = req.body.name;
        user.password = await user.encryptPassword(req.body.password);
        user = await user.save();

        const token = jwt.encode({ id: user.id}, config.jwtSecret);
        return res.send({user, token});
    } catch(err){
        next(err);
    }
};

exports.me = async( req, res, next) => {
    try {
        const user = await User.findById(req.user);
        return res.send(user);
    } catch (error) {
        next(error);
    }
}