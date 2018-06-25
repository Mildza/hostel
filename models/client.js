const mongoose = require('mongoose');

const Schema = mongoose.Schema({

    firstname: String,
    lastname: String,
    email: String,
    room: String,
    period:[{}],
    comentar: String
  });
  
var mlab = "Client" 
var Client = "Client"
  
var Client = module.exports = mongoose.model(mlab, Schema);

module.exports.addClient = function(newClient, callback){    
  newClient.save(callback);
}

// module.exports.getAll = function(email, callback) {
//   Client.find({email: email}, callback)
// }

module.exports.deleteClient = function(id, callback) {
    const query = {_id: id}  
    Client.remove(query, callback)  
}