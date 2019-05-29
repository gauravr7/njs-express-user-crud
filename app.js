const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Init App
const app = express();

// Bring in data models
let Employee = require('./models/employee');

//Load view Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Setup Mongoose connection
// Set up mongoose connection
let dev_db_url = 'mongodb+srv://someuser:abcd1234@cluster0-h9jcl.mongodb.net/test?retryWrites=true';


const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true });

mongoose.Promise = global.Promise;
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Set Public folder
app.use(express.static(path.join(__dirname, 'public')));

// Home Route
app.get('/', function (req, res) {
    res.send('Site Root Page');
})

// View all Employees
app.get('/admin/viewall', function (req, res) {
    let employeesList = Employee.find({}, function (err, employees) {
        if (err) {
            console.log(err);
        }
        else {
            res.render('viewall_employees', {
                employees: employees
            });
        }

    })

})

// Search employee from
app.get('/admin/search', function (req, res) {
    res.render('search', {
        title: 'Search'
    });
})

// Add employee
app.get('/admin/search/:name', function (req, res) {
    var nameRegex = new RegExp(req.params.name, 'i');
    console.log('name regex ', nameRegex);
    Employee.find({ name: nameRegex }, function (err, employees) { 
        if (err) {
            console.log(err);

        }
        else  {
            console.log(employees);
            res.render('search_result', {
                employees: employees,
                title: 'Search'
            });
        }
    })
})

// Add employee
app.get('/admin/add', function (req, res) {
    res.render('add_employee', {
        title: 'Add Employee'
    });
})

// view particular employee
app.get('/admin/view/:id', function (req, res) {
    Employee.findById(req.params.id, function(err, employee) {
        res.render('employee', {
            employee: employee
        });
    });
    
})

// load edit employee form  
app.get('/admin/edit/:id', function (req, res) {
    Employee.findById(req.params.id, function(err, employee) {
        res.render('edit_employee', {
            title: 'edit',
            employee: employee
        });
    });
    
})


// update submit Post 
app.post('/admin/edit/:id', function (req, res) {

    let employee = {};
    employee.name= req.body.name;
    employee.age= req.body.age;
    employee.gender= req.body.gender;
    
    let query = {_id: req.params.id}

    Employee.update(query, employee, function (err) {
        if (err) {
            return next(err);
        }
        else {
            res.redirect('/admin/viewall');
        }
    })
})

// delete employee
app.delete('/admin/delete/:id', function(req, res){
    var query = { _id: req.params.id}
    Employee.remove(query, function(err) {
        if(err) {
            console.log('error');
        }
        res.send('Success');
    })
});

// Add employee
app.post('/admin/add', function (req, res) {

    let employee = new Employee({
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender
    });

    employee.save(function (err) {
        if (err) {
            return next(err);
        }
        else {
            res.redirect('/admin/viewall');
        }
    })
})

const port = 3333;

// Start server
app.listen(port, function () {
    console.log(`Server is started on ${port}`);
})