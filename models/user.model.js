const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    following: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }]
});

userSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(5);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};

userSchema.methods.validPassword = async (candidatePassword, savedPassword) =>{
    const result = await bcrypt.compare(candidatePassword, savedPassword);
    return result;
}

const User = mongoose.model("User", userSchema);

module.exports = { User };