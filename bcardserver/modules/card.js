const mongoose = require('mongoose');

const cardSchema = 
{title: { type: String },
  sutitle: { type: String },
  description: { type: String },
  phone: { type: String },
  email: { type: String },
  web: { type: String,required: false },
  image: { type: String },
  state: { type: String, required: false},
  country: { type: String },
  city: { type: String },
  street: { type: String },
  Hosenumber: { type: Number,required: false },
  zip: { type: Number,required: false },
   owner:  { type: String },
};
const Card = mongoose.model('cards',cardSchema );

module.exports = Card;
