const express = require('express');
const router = express.Router();
var User = require('../models/users');


router.get('/find/:email', function(req, res, next) {
  const email = req.params.email
  User.find({email: email}, function (err, user) {
  if (err) return handleError(err);
  res.json(user)
  })    
})

router.get('/logout', function(req, res, next) {
  req.logout()
  res.redirect('http://localhost:4200')  // http://localhost:4200
  })     
 
module.exports = router