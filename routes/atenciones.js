const express = require('express')
const router = express.Router();
const Note = require('../models/Note');
const {isAuthenticated} = require('../helpers/auth');



router.get('/atenciones/llamarturno',isAuthenticated, (req,res) =>{

    res.render('atenciones/llamarturno');
    
    //res.render( 'users/signin', layout: 'other' );
})



module.exports = router;

