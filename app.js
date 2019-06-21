const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const config = require('./config/database');
const passport = require('passport');

//Init App
const app = express();

// Bring in data models
let Employee = require('./models/employee').Employee;

//Load view Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Setup Mongoose connection
const mongoDB = process.env.MONGODB_URI || config.database;
mongoose.connect(mongoDB, { useNewUrlParser: true });

mongoose.Promise = global.Promise;
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Set Public folder
app.use(express.static(path.join(__dirname, 'public')));

//Express messages middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

// Express session
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));

// Express Validator middleware
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
        , root = namespace.shift()
        , formParam = root;

        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param : formParam,
            msg: msg,
            value: value
        };
    }
}));

//Passport config
require('./config/passport')(passport);
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.get('*', function(req, res, next) {
    res.locals.user = req.user || null;
    next();
});

// Home Route
app.get('/', function (req, res) {
    res.send('Site Root Page');
})

//Route files
let employee = require('./routes/employee');
let users = require('./routes/users');
let person = require('./routes/person');

app.use('/admin', employee);
app.use('/users', users);
app.use('/employee', person);

const port = 3333;

// Start server
app.listen(port, function () {
    console.log(`Server is started on ${port}`);
})