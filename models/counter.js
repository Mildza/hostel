const mongoose = require('mongoose')

const Schema = mongoose.Schema


const counterSchema = new Schema({
    visitors: Number
});

const Counter = mongoose.model('counter', counterSchema)

module.exports = Counter