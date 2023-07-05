const express = require('express');
const path = require('path');
const exphbs =  require('express-handlebars');
const methodOverride = require ('method-override');
const session = require ('express-session');
const flash = require ('connect-flash');



const handlebars = require('handlebars');

handlebars.registerHelper('json', function(context) {
  return JSON.stringify(context);
});

const handlebarsMoment = require('handlebars.moment');

//Carga el modelo de los grupos para el menu en dispositivos
const tvpanel = require('./models/tvpanel');

//Carga el modelo de los Carpetas para el menu en carpetas
const group = require('./models/groupContent');

//Initializations 

const app = express();
const socketIO = require('socket.io');
const http = require('http');
const { extname } = require('path');
var passport = require('passport');




require('./database/Database');

//settings

const port = process.env.PORT || 3000;
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    handlebars: handlebars, // pasamos el handlebars donde registraste el helper
    runtimeOptions:{
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
    
    layautsDir: path.join(app.get('views'), 'layouts'),
    partialsDir:path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));

app.set('view engine', '.hbs');

// Registro de los helpers de handlebars.moment
handlebarsMoment.registerHelpers(handlebars);

//Middlewares
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized:true
}));

app.use(passport.initialize());
app.use(passport.session());
require('../T-DIGITAL/passportConfig/passport');
app.use(flash());


//Middleware realiza la consulta a la base de datos para traer el menu de dispositivos
app.use(async function(req, res, next) {
    if (req.user && req.user.id) {
      const groups = await tvpanel.distinct('group', {user: req.user.id});
      res.locals.groups = groups;
    }
    next();
  });
  
//Middleware realiza la consulta a la base de datos para traer el menu de grupos
app.use(async function(req, res, next) {
    
    if (req.user && req.user.id) {
      const carpetas = await group.find({});
      console.log("resultado" + carpetas);
      res.locals.carpetas = carpetas;
    }
    next();
});

// La función 'convertToTreeData' permanece igual a como se proporcionó antes
function convertToTreeData(carpetas) {
  return carpetas.map(carpeta => ({
    text: carpeta.groupName,
    href: '#' + carpeta._id,
    nodes: carpeta.children ? convertToTreeData(carpeta.children) : undefined
  }));
}


//---------------------------------------------------
app.use(async function(req, res, next) {
  if (req.user && req.user.id) {
    const carpetas = await group.find({});
    const treeData = convertToTreeData(carpetas);
    console.log("resultado" + JSON.stringify(treeData)); // Imprimo los datos ya convertidos en formato de árbol
    res.locals.treeData = treeData; // En lugar de enviar 'carpetas', envío 'treeData' a la vista
  }
  next();
});


//Global Variables
app.use((req,res, next) =>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
   });
   //Routes
   
   app.use(require('../T-DIGITAL/routes/index'));
   app.use(require('../T-DIGITAL/routes/notes'));
   app.use(require('../T-DIGITAL/routes/users'));
   app.use(require('../T-DIGITAL/routes/atenciones'));
   app.use(require('../T-DIGITAL/routes/kioskoadmin'));
   app.use(require('../T-DIGITAL/routes/tvpanel'));
   app.use(require('../T-DIGITAL/routes/services'));
   app.use(require('../T-DIGITAL/routes/content'));

   

//Static Files
app.use(express.static(path.join(__dirname, 'public')));

//Server is listening 


let server = http.createServer(app);

//app.use(express.static(publicPath));


// IO = esta es la comunicacion del backend 
module.exports.io = socketIO(server);
//require('./sockets/socket');

server.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Servicio Usuarios En linea ${ port }`);

});