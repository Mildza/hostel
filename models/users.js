const mongoose = require('mongoose')

const Schema = mongoose.Schema


const userSchema = new Schema({
    email: String,
    username: String,
    googleId: String,
    thumbnail: String,
    admin: Boolean
});

const User = mongoose.model('user', userSchema)

module.exports = User