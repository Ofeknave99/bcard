const { string } = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  city: { type: String, required: true },
  housenumber: { type: Number, required: true },
  phone: { type: String, required: true },
   image:{type:String , required:false},
  country: { type: String, required: true },
  state: { type: String, required: false },
  street: { type: String, required: true },
  role:{type:String,required:true},
  housenumber: { type: Number, required: false },
  
});

const User = mongoose.model('User', userSchema);


module.exports = User;