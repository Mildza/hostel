const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
// const passport = require('passport');
// const jwt = require('jsonwebtoken');
// const config = require('../config/database');
var Client = require('../models/client');

router.post('/email', (req, res, next) =>{
    
    const newclient = new Client ({
      firstname: req.body.firstname,
      lastname : req.body.lastname,
      email : req.body.email,
      room : req.body.room,
      period: req.body.period
      })
  
      let daystart = newclient.period[0].beginDate.day
      let monthstart = newclient.period[0].beginDate.month
      let yearstart = newclient.period[0].beginDate.year
      
      let dayend = newclient.period[1].endDate.day
      let monthend = newclient.period[1].endDate.month
      let yearend = newclient.period[1].endDate.year
          
      const output = `
        <h3>Rezervacija</h3>
        <ul>  
          <li>Ime: ${newclient.firstname}</li>
          <li>Prezime: ${newclient.lastname}</li>
          <li>Email: ${newclient.email}</li>
          <li>Apartman: ${newclient.room}</li>
          <li>Dolazak: ${daystart}/${monthstart}/${yearstart}</li>
          <li>Odlazak: ${dayend}/${monthend}/${yearend}</li>
        </ul>
        `
    
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'milanvukovic1974', // generated ethereal user
        pass: 'mikirur1'  // generated ethereal password
    },
    tls:{
      rejectUnauthorized:false
    }
  });
  
  // setup email data with unicode symbols
  let mailOptions = {
      from: '"Happy Star Hostel" <${newclient.email}>', // sender address
      to: 'mildzan@gmail.com', // list of receivers
      subject: 'Rezervacija ', // Subject line
      text: 'Hello world?', // plain text body
      html: output // html body
  };
  
  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }      

      Client.addClient(newclient, (err, user) => {
        if(err){
          res.json({success: false, msg:'Failed add Client'});
        } else {
          res.json({success: true, msg:'Client added'});
        }
      });
      console.log('Message sent: %s', info.messageId);   

  });    

  });

  router.get('/all', function(req, res, next) {

    Client.find({}, function (err, client) {
      if (err) return handleError(err);
      // Prints "Space Ghost is a talk show host".
      res.json(client)
    })
    
  })
  
module.exports = router