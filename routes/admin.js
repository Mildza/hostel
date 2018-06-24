const router = require('express').Router();
const passport = require('passport')

const authCheck = (req, res, next) => {
    if(!req.user){
        res.send('User is:' + req.user)
        
        // res.redirect('/auth/login');
    } else {
        next();
    }
};

router.get('/', authCheck, (req, res) => {
    // res.send('you are logged in, this is your profile - ' + req.user.username);
    let redirectUrl = 'http://localhost:4200/login/' + req.user; //http://localhost:4200/login/'
    res.redirect(redirectUrl)
});

module.exports = router;
 