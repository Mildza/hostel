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
//   if(!req.user){
//     res.send('User is:' + req.user)
//   } else {
//     res.sendFile(path.join(__dirname,'http://localhost:4200/admin/'), {user: req.user})
     let redirectUrl = 'http://localhost:4200/login/' + req.user.email;
     res.redirect(redirectUrl)    
//     res.send('you are logged in, this is your profile - ' + req.user.username);
// }    
    // res.redirect('/auth/login');
  // res.send(req.user)
   // res.json(req.user)
  // res.redirect('http://localhost:4200/admin')
    //res.json({user: req.user.username, googleId: req.user.googleId})
    // res.redirect('/admin/')   
})
  
module.exports = router