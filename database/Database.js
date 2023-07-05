const mongoose = require ('mongoose');
//const {Schema} = mongoose;
mongoose.set("strictQuery", false);
mongoose.connect('mongodb://localhost:27017/tddigital',{

    useNewUrlParser: true

})
    .then(db=>console.log('Db is conectada'))
    .catch(err => console.error(err));



    
/*
const ciudadSchema = new mongoose.Schema(
    {
        name:{
            type:String
        },
        email:{
            type:String
        },
        numerPhone:{
            type:Number,
            default: '123-456'
        }
    },
{
    timestamps:true
}

)

const ciudades = new mongoose.model('ciudades', ciudadSchema)


ciudades.create(
    {
        name:'jesus',
        email:'whhr16@hotmail.com',
        numerPhone: '12345678'
}
)*/

