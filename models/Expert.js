const mongoose = require('mongoose');

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
      rating: Number
  }
)

module.exports = mongoose.model("Expert", expertSchema);
