const mongoose = require ('mongoose');
const {Schema} = mongoose;
const bcrypt = require ('bcryptjs');

const groupContentSchema = mongoose.Schema({
    groupName: String,
    date: {type: Date, default:Date.now},  
    user:{type: String}
});


module.exports = mongoose.model('groupContent',groupContentSchema);


