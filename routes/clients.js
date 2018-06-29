const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
var Client = require('../models/client');
const config = require('../config/database')


router.post('/add', (req, res, next) =>{
    const newclient = new Client ({
      firstname: req.body.firstname,
      lastname : req.body.lastname,
      email : req.body.email,
      room : req.body.room,
      period: req.body.period,
      comentar: req.body.comentar,
      price: req.body.price
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
        <p><strong> Cena: </strong>${newclient.price}</p>
        <p><strong> Dolazak: </strong>${daystart}/${monthstart}/${yearstart}</p>
        <p><strong> Odlazak: </strong>${dayend}/${monthend}/${yearend}</p>        
        <p><strong> Ime: </strong>${newclient.firstname}</p>
        <p><strong> Prezime: </strong>${newclient.lastname}</p>
        <p><strong> Email: </strong>${newclient.email}</p>
        <p><strong> Napomena: </strong>${newclient.comentar}</p>
      `
    
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
          user: config.user2, // generated ethereal user
          pass: config.pass2  // generated ethereal password
      },
      tls:{
        rejectUnauthorized:false
      }
    });  
  // setup email data with unicode symbols
  let mailOptions = {
      from: '"Happy Star" <${newclient.email}>', // sender address
      to: 'sale.gaga@gmail.com', // sale.gaga@gmail.com
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
    });   
  });

  router.get('/all', function(req, res, next) {
    Client.find({}, function (err, client) {
      if(err){
        next()       
      } else {
          res.json(client)          
      }     
    })    
  })

  router.get('/one/:email', function(req, res, next) {
    const email = req.params.email 
    if(email=='sale.gaga@gmail.com'){
      Client.find({}, function (err, client) {
        if(err){
          next()       
        } else {
            res.json(client)      
        }     
      }) 
    } else {
  
    Client.find({email: email}, function (err, client) {
      if(err){
        next()      
      } else {
          res.json(client)         
      }     
    })  
  }  
  })
  
  router.delete('/delete/:id', function(req, res) {
    const id = req.params.id 
    Client.find({_id: id}, function (err, client) {
      if(err){
        next()      
      } else {

     let firstname = client[0].firstname
     let lastname = client[0].lastname
     let  email  = client[0].email
     let room = client[0].room
     let period = client[0].period
     let comentar = client[0].comentar
     let price = client[0].price

    let daystart = client[0].period[0].beginDate.day
    let monthstart = client[0].period[0].beginDate.month
    let yearstart = client[0].period[0].beginDate.year
    
    let dayend = client[0].period[1].endDate.day
    let monthend = client[0].period[1].endDate.month
    let yearend = client[0].period[1].endDate.year
    
    const output = `
      <h3>Otkazana Rezervacija za:</h3> 
        <p><strong> Apartman: </strong>${room}</p>
        <p><strong> Cena: </strong>${price}</p>
        <p><strong> Dolazak: </strong>${daystart}/${monthstart}/${yearstart}</p>
        <p><strong> Odlazak: </strong>${dayend}/${monthend}/${yearend}</p>        
        <p><strong> Ime: </strong>${firstname}</p>
        <p><strong> Prezime: </strong>${lastname}</p>
        <p><strong> Email: </strong>${email}</p>
        <p><strong> Napomena: </strong>${comentar}</p>
      `
    
    let transporter2 = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
          user: config.user2, // generated ethereal user
          pass: config.pass2  // generated ethereal password
      },
      tls:{
        rejectUnauthorized:false
      }
    });  
  // setup email data with unicode symbols
  let mailOptions2 = {
      from: '"Happy Star" <${email}>', // sender address
      to: 'sale.gaga@gmail.com', // sale.gaga@gmail.com
      subject: 'Otkazana Rezervacija ', // Subject line
      text: 'Hello world?', // plain text body
      html: output // html body
  };
      Client.deleteClient(id, (err) => {
          if(err){
            res.json({success: false, msg:'Delete failed'})
            next()      
          }
          transporter2.sendMail(mailOptions2, (error, info) => {
            if (error) {
              console.log(error);
            }      
          });
          res.json({success: true, msg:'Client deleted'})
        })
      }     
    }) 
  }) 
  
module.exports = router