const mongoose = require('mongoose');
// import {Image} from 'mongoose'

const expertSchema = new mongoose.Schema(
  {
      name: {
          type: String,
          required:'Please enter your name'
      },
      address: {
        type: String
        // required: true
      },
      mobile: {
        type: String
        // required: true
      },
      password: {
        type: String
      },
      // image: Image,
      text: String,
  }
)

module.exports = mongoose.model("Expert", expertSchema);
