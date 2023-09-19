const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  cards: {
    type: Array,
    required: true,
  }
})

const fav = mongoose.model("fav", favoriteSchema);
module.exports = fav;