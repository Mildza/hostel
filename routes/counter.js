const express = require('express');
const router = express.Router();
var Counter = require('../models/counter');

router.get('/get', function(req, res, next) {
  Counter.find({}, function (err, counter) {
    if(err){
        next()       
      } else {          
        res.json(counter)
    }
  })    
})
  
  router.put('/rise/:counter', function(req, res, next) {
    const counter = Number(req.params.counter) + 1 
   console.log(counter)
    Counter.update({ _id: "5b4dbca4fb6fc07d5ad2a112"}, {visitors: counter}, function (err) {
    if (err){
      res.json({success: false, msg:'Not updated counter'})
      next()
    } else {
      res.json({success: true, msg:'Counter updated'})
      }     
    }) 
   
  })
 
module.exports = router