const express = require('express')
const router = express.Router();
const multer = require('multer');
const {isAuthenticated} = require('../helpers/auth');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const ffmpeg = require('fluent-ffmpeg');
const content = require('../models/content');
const group = require('../models/groupContent');
var Handlebars = require("handlebars");
var MomentHandler = require("handlebars.moment");
MomentHandler.registerHelpers(Handlebars);

const util = require('util');
const unlink = util.promisify(fs.unlink);
const rmdir = util.promisify(fs.rmdir);



const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      const dirPath = path.join(__dirname, '/../public/assets/upload', path.parse(file.originalname).name);
      fs.mkdirSync(dirPath, { recursive: true });
      cb(null, dirPath);
    },
    filename: function(req, file, cb) {
      cb(null, file.originalname);
    }
  });
  
  const upload = multer({storage: storage});
  
 /* router.get('/content', isAuthenticated, async (req, res) => {
    try {
      const files = await content.find().lean();
      res.render('content/all-content', { files });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error retrieving files' });
    }
  });*/

  router.get('/content', isAuthenticated , async(req,res) =>{
    try {
        const contents = await content.find({user: req.user.id}).lean().sort({date: 'desc'});
        res.render('content/all-content',{contents});
    } catch(error) {
        console.error(error);
        // Maneja el error de la manera que consideres adecuada.
    }
})


router.get('/content/get-groups', isAuthenticated, async (req, res) => {

  try {
      const groups = await group.find({});
      res.status(200).send(groups);
  } catch (err) {
      res.status(500).send(err);
  }
});


router.post('/content', isAuthenticated, upload.array('file', 12), async (req, res, next) => {
    const filesProcess = req.files.map(async file => {
      let newFile;
  
      if (file.mimetype.startsWith('image/')) {
        // Generate thumbnail for image
        await sharp(file.path)
          .resize(200) // the size of the thumbnail
          .toFile(path.join(file.destination, 'thumb_' + file.originalname));
  console.log("llego aca: =" + file.size);
  console.log("llego aca: =" + file.mimetype);

  const fileSizeInBytes = file.size;
const fileSizeInMB = fileSizeInBytes / (1024 * 1024)// Divide el tamaño en bytes entre 1024 * 1024 para obtener el tamaño en MB
const roundedFileSizeInMB = Math.round(fileSizeInMB * 100) / 100; // Redondea el número a dos decimales

        newFile = new content({
          filename: file.originalname,
          thumbnail: 'thumb_' + file.originalname,
          folder: path.join('/assets/upload', path.parse(file.originalname).name),
          tamaño: roundedFileSizeInMB,
          tipo: file.mimetype
        });
      } else if (file.mimetype.startsWith('video/')) {
        // Generate thumbnail for video
        await ffmpeg(file.path)
          .screenshots({
            timestamps: ['00:00:02'],
            filename:'thumb_' + path.parse(file.originalname).name + '.jpg',
            folder: file.destination,
            size: '200x?',
          });
          const fileSizeInBytes = file.size;
          const fileSizeInMB = fileSizeInBytes / (1024 * 1024).toFixed(2); // Divide el tamaño en bytes entre 1024 * 1024 para obtener el tamaño en MB
          const roundedFileSizeInMB = Math.round(fileSizeInMB * 100) / 100; // Redondea el número a dos decimales
             
        newFile = new content({
          filename: file.originalname,
          thumbnail: 'thumb_' + path.parse(file.originalname).name + '.jpg',
          folder: path.join('/assets/upload', path.parse(file.originalname).name),
          tamaño: roundedFileSizeInMB,
          tipo: file.mimetype
        });
      }
  
      if (newFile) {
        newFile.user = req.user.id;
        await newFile.save();
      }
    });
  
    try {
      await Promise.all(filesProcess);
      const contents = await content.find({user: req.user.id}).lean().sort({date: 'desc'});
      res.render('content/all-content',{contents});
      //res.status(200).json({message: 'Files uploaded successfully'});
    } catch (error) {
      next(error); // Pass the error to the next middleware
    }
  });


  router.post('/content/create-group', isAuthenticated, async (req, res) => {
    const groupName = req.body.groupName;

    // Comprueba si ya existe un grupo con el mismo nombre
    const existingGroup = await group.findOne({ groupName: groupName });
    if (existingGroup) {
      console.log('Un grupo con este nombre ya existe.');
        return res.status(400).send({ error: 'Un grupo con este nombre ya existe.' });
    }

    const newGroup = new group({
        groupName: groupName,
        // aquí puedes agregar más campos si los necesitas
    });

    try {
        await newGroup.save();
        res.status(201).send();
    } catch (err) {
        res.status(400).send(err);
    }
});


router.put('/content/edit-group/:id', isAuthenticated, async (req, res) => {
    const groupName = req.body.groupName; // Asegúrate de que esta línea coincide con el cuerpo de la solicitud que estás enviando

    try {
        const updatedGroup = await group.findOneAndUpdate({ _id: req.params.id }, { groupName: groupName });
        if (!updatedGroup) {
            res.status(404).send();
        } else {
            res.status(200).send();
        }
    } catch (err) {
        res.status(500).send(err);
    }
});










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



router.delete('/content/delete/:id', isAuthenticated, async (req,res) => {
  try {
      const contentData = await content.findById(req.params.id);
      if (contentData) {
          // Define el directorio a eliminar
          const dirPath = path.join(__dirname, '/../public/assets/upload', path.parse(contentData.filename).name);
          console.log(`Deleting directory: ${dirPath}`);
  
          // Comprueba si el directorio existe
          if (fs.existsSync(dirPath)) {
              // Lee el directorio
              const files = fs.readdirSync(dirPath);
  
              // Elimina cada archivo del directorio
              for (const file of files) {
                  console.log(`Deleting file: ${file}`);
                  await unlink(path.join(dirPath, file));
              }
  
              // Elimina el directorio
              await rmdir(dirPath);
              console.log('Directory deleted');
          } else {
              console.log('Directory does not exist');
          }

          await content.findByIdAndDelete(req.params.id);
          req.flash('success_msg', 'Contenido eliminado ');

          const contents = await content.find({user: req.user.id}).lean().sort({date: 'desc'});
          res.render('content/all-content',{contents});
      }
  } catch (error) {
      console.error(`Error: ${error.message}`);
  }
});

router.post('/content/delete-multiple', isAuthenticated, async (req, res) => {
  try {
      const ids = req.body;
      if (!Array.isArray(ids)) {
        // Handle error: expected an array of IDs
        console.error('Expected an array of IDs');
        return;
    }
      for (const id of ids) {
          const contentData = await content.findById(id);
          if (contentData) {
              const dirPath = path.join(__dirname, '/../public/assets/upload', path.parse(contentData.filename).name);

              if (fs.existsSync(dirPath)) {
                  const files = fs.readdirSync(dirPath);

                  for (const file of files) {
                      await unlink(path.join(dirPath, file));
                  }

                  await rmdir(dirPath);
              }
              
              await content.findByIdAndDelete(id);
          }
      }
      req.flash('success_msg', 'Contenido eliminado ');
      const contents = await content.find({user: req.user.id}).lean().sort({date: 'desc'});
      res.render('content/all-content',{contents});
  } catch (error) {
      console.error(`Error: ${error.message}`);
  }
});


module.exports= router;