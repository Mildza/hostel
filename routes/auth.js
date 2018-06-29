const router = require('express').Router()
const passport = require('passport')
const path = require('path');

router.get('/google', passport.authenticate('google', {
  scope:[
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
        ] 
}))

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {

     let redirectUrl = 'http://localhost:4200/login/' + req.user.email; //http://localhost:4200/login/'
     res.redirect(redirectUrl)    
  
})
  
module.exports = router