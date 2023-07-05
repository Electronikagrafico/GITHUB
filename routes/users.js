const express = require('express')
const router = express.Router();
const User = require('../models/Users');
const passport = require("passport");
const bcrypt = require ('bcryptjs');





router.get('/users/signin', (req,res) =>{
    res.render('users/signin',  {layout: 'login'});
   
    //res.render( 'users/signin', layout: 'other' );
})


router.post('/users/signin',passport.authenticate('local',{

    successRedirect: '/',
    failureRedirect: '/users/signin',
    failureFlash: true
  

  }));
     
 

router.get('/users/signup', (req,res)=>{
    res.render('users/signup');
});

router.post('/users/signup', async(req,res) => {
    const {name, email, password, confirm_password } = req.body;
    console.log(req.body);
    const errors = [];

    if(name.length <= 0){
        errors.push({text: 'Please insert your Name'});
    }
    if(password.length <= 0){
        errors.push({text: 'Please insert your Password'});
    }
    if(email.length <= 0){
        errors.push({text: 'Please insert your email'});
    }

    if(password != confirm_password){
        errors.push({text: 'Password do not match'});
    }
    if (password.length < 4){
        errors.push({text: 'Password must be at least 4 Character'});
    }
    if(errors.length>0){
        res.render('users/signup', {errors, name, email, password,confirm_password});
    }else{
       const emailUser = await User.findOne ({email: email});
       if (emailUser){
        req.flash('error_msg','The Email is already in use' );
        res.redirect('/users/signup');
       }       
       const newUser = new  User({name,email,password});  
       newUser.password = await newUser.encryptPassword(password);
       await newUser.save();
       req.flash('success_msg', 'You are registered');
       res.redirect('/users/signin');


    }
  
})

router.get('/users/logout', (req,res) =>{
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
})

module.exports= router;