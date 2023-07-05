const express = require('express')
const router = express.Router();
const tvpanel = require('../models/tvpanel');
const {isAuthenticated} = require('../helpers/auth');



router.get('/tvpanel/add',isAuthenticated,(req,res)=>{
    res.render('tvpanel/nuevo-tvpanel') ;
    console.log(req);
    console.log("si esta llegando aqui");

})

router.post('/tvpanel/nuevo-tvpanel', isAuthenticated,async(req,res)=>{
    console.log(req.body);
    
    const {title, description,group} = req.body;
    const url = "escritorio" + title;
    const errors = [];
    if (!title) {
        errors.push({text:'por favor escriba un nuevo titulo'});
    }
    if (!description){
        errors.push({text: 'por favor escriba una descripción'});
    }


    if (errors.length > 0){
        res.render('tvpanel/nuevo-tvpanel',{
            errors,
            title,
            description,
            group,
            url
        });
       
    }else{
        const newTvpanel = new tvpanel({title, description,group, url });
        newTvpanel.user = req.user.id;
        await newTvpanel.save();
        req.flash('success_msg', 'tvpanel creado exitosamente');
        res.redirect('/tvpanel');
}
})
router.get('/tvpanel', isAuthenticated , async(req,res) =>{
    
    const tv = await tvpanel.find({user: req.user.id}).lean().sort({date: 'desc'});
    console.log(tv);
    res.render('tvpanel/all-tvpanel',{tv})
 
 })
router.get('/tvpanel/edit/:id', isAuthenticated, async(req,res)=>{
    const tv =  await tvpanel.findById(req.params.id).lean();
    res.render('tvpanel/edit-tvpanel', {tv})
    
});


router.put('/tvpanel/edit-tvpanel/:id', isAuthenticated, async (req, res) => {
    const {title, description} = req.body;
    const url = "escritorio" + title;
    await tvpanel.findByIdAndUpdate(req.params.id, {title, description, url});
    req.flash('success_msg', 'TV Panel actualizado exitosamente');
    res.redirect('/tvpanel');
});



router.delete('/tvpanel/delete/:id', isAuthenticated , async (req,res)=>{
     await tvpanel.findByIdAndDelete(req.params.id)
     req.flash('success_msg', 'tvpanel eliminado ');
    res.redirect('/tvpanel');
})


module.exports= router;