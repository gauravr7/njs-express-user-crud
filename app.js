const express = require('express');
const path = require('path');

//Init App
const app = express();

//Load view Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Home Route
app.get('/', function (req, res) {
    var emps = [
        {
            id: 1,
            name: 'emp1',
            age: 23,
            gender: 'm'
        },
        {
            id: 2,
            name: 'emp2',
            age: 33,
            gender: 'f'
        },
        {
            id: 3,
            name: 'emp3',
            age: 27,
            gender: 'f'
        }
    ]
    res.render('index', {
        title: 'John',
        employees: emps
    });
})

// Add Route
app.get('/admin/add', function (req, res) {
    res.render('add_employee', {
        title: 'Add Employee'
    });
})

const port = 3333;

// Start server
app.listen(port, function () {
    console.log(`Server is started on ${port}`);
})