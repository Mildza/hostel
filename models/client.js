const mongoose = require('mongoose');

const Schema = mongoose.Schema({

    firstname: String,
    lastname: String,
    email: String,
    room: String,
    period:[{}]
  });
  
  var mlab = "Client" 
  var Client = "Client"
  
  var Client = module.exports = mongoose.model(mlab, Schema);

  module.exports.addClient = function(newClient, callback){    
    newClient.save(callback);
  }

  module.exports.getAll = function(firstname, callback) {
    const query = {firstname: firstname}
    Client.find(query, callback)

  }