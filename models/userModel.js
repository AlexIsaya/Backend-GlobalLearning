const mongoose = require('mongoose');

const { Schema } = mongoose;

//defino la estructura de mi documento para la coleccion
const userModel = new Schema(
    {
      firstName: {type: String},
      lastName: {type: String},
      userName: {type: String},
      password: {type: String},
      email: {type: String},
      address: {type: String},
      phone: {type: Number}
    }
  )
  
  //exporto la estructura
module.exports = mongoose.model('User', userModel);