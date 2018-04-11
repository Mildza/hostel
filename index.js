const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const path = require('path');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose')
const config = require('./config/database')

mongoose.connect(config.database)

mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + config.database)
})
mongoose.connection.on('error', (err) => {
    console.log('Database error: ' + err)
})

const app = express();

const clients = require('./routes/clients')
const port = process.env.PORT || 3000

app.use(cors())

// app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/clients', clients)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, ('public/index.html')))
})

app.listen(port, () => {
    console.log('Its Starts' + ' on port: ' + port)
})