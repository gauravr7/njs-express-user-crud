const express = require('express');
const router = express.Router();

// Bring in Employee Model
let Employee = require('../models/employee');

// View all Employees
router.get('/viewall', function (req, res) {
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
router.get('/search', function (req, res) {
    res.render('search', {
        title: 'Search'
    });
})

// Add employee
router.get('/search/:name', function (req, res) {
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
router.get('/add', function (req, res) {
    res.render('add_employee', {
        title: 'Add Employee'
    });
})

// view particular employee
router.get('/view/:id', function (req, res) {
    Employee.findById(req.params.id, function(err, employee) {
        res.render('employee', {
            employee: employee
        });
    });
    
})

// load edit employee form  
router.get('/edit/:id', function (req, res) {
    Employee.findById(req.params.id, function(err, employee) {
        res.render('edit_employee', {
            title: 'Edit',
            employee: employee
        });
    });
    
})


// update submit Post 
router.post('/edit/:id', function (req, res) {

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
            req.flash('success', 'Details Updated');
            res.redirect('/admin/viewall');
        }
    })
})

// delete employee
router.delete('/delete/:id', function(req, res){
    var query = { _id: req.params.id}
    Employee.remove(query, function(err) {
        if(err) {
            console.log('error');
        } 
        else {
            req.flash('info', 'Employee deleted');
            res.send('Success');
        }
        
    })
});

// Add employee
router.post('/add', function (req, res) {
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('age','Age is Required').notEmpty();
    req.checkBody('gender', 'Gender is required').notEmpty();

    // Get Errors
    let errors = req.validationErrors();

    if (errors) {
        res.render('add_employee', {
            title: 'Add Employee',
            errors: errors
        });
    } else {
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
                console.log(req.body.name + ' Employee Added');
                req.flash('success', 'Employee Added');
                res.redirect('/admin/viewall');
            }
        })
    }

    
})

module.exports = router;