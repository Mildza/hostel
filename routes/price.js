const express = require('express');
const router = express.Router();
var Room = require('../models/room');
const config = require('../config/database')

router.get('/getPrice', function(req, res, next) {
  Room.find({}, function (err, room) {
  if (err) return handleError(err);
  res.json(room)
  })    
})

router.post('/discount', function(req, res, next) {
    console.log("check")
    const updateRoom = new Room ({
        number: req.body.number,
        price : req.body.price,
        discount : req.body.discount
        })
        console.log(updateRoom)
    Room.update({number: updateRoom.number}, {discount:updateRoom.discount, price:updateRoom.price, discount:updateRoom.discount}, function (err, room) {
    if (err) return handleError(err);
    res.json(room)
    })    
  })    
 
module.exports = router