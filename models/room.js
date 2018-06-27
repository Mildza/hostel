const mongoose = require('mongoose')

const Schema = mongoose.Schema


const roomSchema = new Schema({
    number: Number,
    price: Number,
    discount: Number
});

const Room = mongoose.model('room', roomSchema)

module.exports = Room