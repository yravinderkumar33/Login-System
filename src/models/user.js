const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const getHashedPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        min: 8,
        required: true
    },
    gender: {
        type: String,
        lowercase: true,
        enum: ["male", "female"],
        required: true
    }
});

userSchema.methods.getJWTToken = function () {
    return jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: this.id
    }, process.env.JWT_SECRET);
}

userSchema.methods.matchPassword = function (passwordToMatch) {
    return bcrypt.compare(passwordToMatch, this.password);
}

userSchema.pre('save', async function (next) {
    this.password = await getHashedPassword(this.password);
    next();
});

module.exports = mongoose.model('User', userSchema);