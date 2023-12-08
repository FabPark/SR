const mongoose = require("mongoose");

//might use menu later
const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
});

const restaurantsSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: false,
  },
  koreanName: {
    type: String,
    required: false,
  },
  englishCategory: {
    type: Array,
    required: false,
  },
  englishName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  img: {
    type: String,
    required: false,
  },
  info: {
    type: String,
    required: false,
  },
});

Restaurants = mongoose.model("RestCard2", restaurantsSchema, "RestCard2");
module.exports = Restaurants;
