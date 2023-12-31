const express = require('express')
const router = express.Router();
const {isAuthenticated} = require('../helpers/auth');


router.get('/', isAuthenticated, (req, res) => {
    res.render('index');
})


router.get('/about', isAuthenticated, (req, res) =>{
    res.render('About');
})

module.exports= router;