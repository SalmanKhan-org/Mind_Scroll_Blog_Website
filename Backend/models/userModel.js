const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");

const userSchema = new Schema({
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin'],
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    bio: {
        type: String,
        trim: true
    },
    avatar: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        trim: true,
        select:false
    },
}, { timestamps:true })

userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn:"1d"
    })
}

const User = mongoose.model('User', userSchema, 'users')
module.exports = User;