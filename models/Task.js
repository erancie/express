const mongoose = require('mongoose');
const validator = require('validator');

const taskSchema = new mongoose.Schema({ 
    title: String,
    description: String,
    type: String,
    suburb: String,
    // image: Buffer, //change this to buffer** TO DO **
    date: Date,
    budgettype: {
      type: String,
      enum: ['total', 'hourly']
    },
    budgetamount: Number
})
module.exports = mongoose.model('Task', taskSchema);
