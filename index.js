const express = require('express');
const cookieSession = require('cookie-session')
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors')
const path = require('path');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose')
const passportSetup = require('./config/passport-setup.js')
const clients = require('./routes/clients')
const auth = require('./routes/auth')
const admin = require('./routes/admin')
const google = require('./routes/user')
const config = require('./config/database')
const user = require('./models/users')
const price = require('./routes/price')

mongoose.connect(config.database)

mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + config.database)
})
mongoose.connection.on('error', (err) => {
    console.log('Database error: ' + err)
})

const app = express();
app.use(cors())

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys:[config.session.cookieKey]
}))

app.use(passport.initialize());
app.use(passport.session());

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/clients', clients)
app.use('/auth', auth)
app.use('/admin', admin)
app.use('/user', google)
app.use('/price', price)

const port = process.env.PORT || 3000

// app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));


// app.get('/admin', (req, res) => {
//     res.sendFile(path.join(__dirname, ('public/index.html/admin')))
// })
// app.get('admin', (req, res) => {
//     res.sendFile(path.join(__dirname, ('public/index.html')))
// })
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, ('public/index.html')))
})

app.listen(port, () => {
    console.log('Its Starts' + ' on port: ' + port)
})