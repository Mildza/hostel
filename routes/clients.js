const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
// const passport = require('passport');
// const jwt = require('jsonwebtoken');
// const config = require('../config/database');
var Client = require('../models/client');
const config = require('../config/database')

router.post('/add', (req, res, next) =>{
    
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
        <p><strong> Apartman: </strong>${newclient.room}</p>
        <p><strong> Dolazak: </strong>${daystart}/${monthstart}/${yearstart}</p>
        <p><strong> Odlazak: </strong>${dayend}/${monthend}/${yearend}</p>        
        <p><strong> Ime: </strong>${newclient.firstname}</p>
        <p><strong> Prezime: </strong>${newclient.lastname}</p>
        <p><strong> Email: </strong>${newclient.email}</p>
      `
    
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
          user: config.user, // generated ethereal user
          pass: config.pass  // generated ethereal password
      },
      tls:{
        rejectUnauthorized:false
      }
    });  
  // setup email data with unicode symbols
  let mailOptions = {
      from: '"Happy Star Hostel" <${newclient.email}>', // sender address
      to: 'mildzan@gmail.com', // sale.gaga@gmail.com
      subject: 'Rezervacija ', // Subject line
      text: 'Hello world?', // plain text body
      html: output // html body
  };
 
    Client.addClient(newclient, (err, user) => {
      if(err){
        res.json({success: false, msg:'Delete failed'})
        next()      
      }
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
          }      
        });
        res.json({success: true, msg:'Client added'});
      
    }); // console.log('Message sent: %s', info.messageId);
     
  });

  router.get('/all', function(req, res, next) {
    Client.find({}, function (err, client) {
      if (err) return handleError(err);
      // Prints "Space Ghost is a talk show host".
      res.json(client)
    })    
  })

  router.delete('/delete/:id', function(req, res) {
    const id = req.params.id       
    Client.deleteClient(id, (err) => {
      if(err){
        res.json({success: false, msg:'Delete failed'})
        next()      
      }
      res.json({success: true, msg:'Client deleted'})
    })
  }) 

  
module.exports = router