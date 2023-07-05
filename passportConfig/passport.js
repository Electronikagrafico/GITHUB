const passport = require('passport');
const User =require('../models/Users');

var LocalStrategy = require('passport-local').Strategy;
passport.use( new LocalStrategy({
    usernameField: 'email',
     passwordField: "password",
}, async (email,password,done)=>{
   const user =  await User.findOne({email: email});
    if(!user){
        console.log("llego aca");
        return done(null, false, {message: 'Not User found'});
    }else{
        const match = await user.matchPassword(password);
        if(match){
            return done(null, user);
        }else{
            return done(null, false, {message: 'incorrect password'})
        }
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) =>{
    User.findById(id, (err,user)=>{
        done(err, user);
    });
});

