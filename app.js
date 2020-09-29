// import npm modules
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const flash = require('connect-flash');
const csurf = require('csurf');
const multer = require('multer');


//import routes
const loginRoutes = require('./routes/login')
const dashboardRoutes = require('./routes/dashboard')
const productsRoutes = require('./routes/products')
const sequelize = require('./utils/database')
const errorController = require('./controllers/error')

//create server
const app = express();
const csurfProtection = csurf();

// set up and configure
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + "-" + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        cb(null, false)
    }
};
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json());

app.use(multer({
    storage: fileStorage,
    fileFilter: fileFilter
}).single('image'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(session({
    secret: 'secret-key',
    store: new SequelizeStore({
        db: sequelize
    }),
    resave: false, // we support the touch method so per the express-session docs this should be set to false
    proxy: true // if you do SSL outside of node.
}));
app.use(flash())
app.use((req, res, next) => {
    csurfProtection(req, res, next)
})
app.use((req, res, next) => {
    res.locals.csrfToken = req.csrfToken()
    res.locals.user = req.session.user
    next()
})
//use routes here
app.use(loginRoutes)
app.use(dashboardRoutes)
app.use(productsRoutes)
app.use('/500', errorController.get505Error)
app.use(errorController.get404Error)
app.use((error, req, res, next) => {
    if (error.status >= 100 && error.status < 600)
        res.status(error.status);
    else
        res.status(500);
    console.log(error)
    res.redirect('/500')
})

// tell server what port to listen to
sequelize.sync()
    .then(() => {
        app.listen(4000, () => {
            console.log('app started')
        });
    })
    .catch(err => {
        console.log(err)
    })