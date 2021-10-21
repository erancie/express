const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({ 
    title: String,
    description: String,
    // type: String,
    // suburb: String,
    // // image: Image,
    // date: Date,
    // budget: Number,
    // amount: Number
})
module.exports = mongoose.model('Task', userSchema);
