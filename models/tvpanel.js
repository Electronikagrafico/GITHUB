const mongoose = require('mongoose');
const { Shema }  = mongoose;

const tvpanelSchema = mongoose.Schema({
    title: { type: String, required:true},
    description: {type: String, required:true},
    url:{type: String,required:true},
    group: {type: String, required:false}, // nuevo campo de grupo
    date: {type: Date, default:Date.now},  
    user:{type: String}
});

module.exports = mongoose.model('tvpanel', tvpanelSchema);