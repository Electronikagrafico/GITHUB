const mongoose = require ('mongoose');
const {Schema} = mongoose;
const bcrypt = require ('bcryptjs');


const contentSchema = mongoose.Schema({
    filename: String,
    thumbnail: String,
    tamaño: Number,
    tipo: String,
    folder: String, 
    date: {type: Date, default:Date.now},  
    user:{type: String}
});




module.exports = mongoose.model('content',contentSchema);


