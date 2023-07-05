const express = require('express')
const router = express.Router();
const Note = require('../models/Note');
const {isAuthenticated} = require('../helpers/auth');



router.get('/kiosco/add',isAuthenticated,(req,res)=>{
    res.render('kiosco/nuevo-kiosko') ;
    console.log(req);
    console.log("si esta llegando aqui");

})

router.post('/kiosco/nuevo-kiosko', isAuthenticated,async(req,res)=>{
    console.log(req.body);
    const {title, description} = req.body;
    const errors = [];
    if (!title) {
        errors.push({text:'por favor escriba un nuevo titulo'});
    }
    if (!description){
        errors.push({text: 'por favor escriba una descripción'});
    }

    if (errors.length > 0){
        res.render('kiosco/nuevo-kiosko',{
            errors,
            title,
            description
        });
       
    }else{

        const newNote = new Note({title, description });
        newNote.user = req.user.id;
        await newNote.save();
        req.flash('success_msg', 'Kiosco creado exitosamente');
        res.redirect('/kiosco');
}
})

router.get('/services', isAuthenticated , async(req,res) =>{
    
   const notes = await Note.find({user: req.user.id}).lean().sort({date: 'desc'});
    res.render('services/all-services',{notes})

})

router.get('/kiosco/edit/:id', isAuthenticated, async(req,res)=>{
    const note =  await Note.findById(req.params.id).lean();
    res.render('kiosco/edit-kiosko', {note})
});

router.put('/kiosco/edit-kiosko/:id', isAuthenticated , async (req,res) =>{
    const {title,description } = req.body;
    await Note.findByIdAndUpdate(req.params.id, {title,description});
    req.flash('success_msg', 'Kiosco editado correctamente');
    res.redirect('/kiosco');
});

router.delete('/kiosco/delete/:id', isAuthenticated , async (req,res)=>{
     await Note.findByIdAndDelete(req.params.id)
     req.flash('success_msg', 'Kiosco eliminado ');
    res.redirect('/kiosco');
})
module.exports= router;