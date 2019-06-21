const express = require('express');
const router = express.Router();

// Bring in Employee Model
let Employee = require('../models/employee').Employee;
let Dept = require('../models/employee').Dept;
let Address = require('../models/employee').Address;

// View all Employees
router.get('/viewall', function (req, res) {
    let employeesList = Employee.find({}, function (err, employees) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(employees);
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

let allDepts= [];
// Add employee
router.get('/add', ensureAuthenticated, function (req, res, next) {
    Dept.find({}, function(err, depts){
        if (err) {
            console.log(err);
        } else {
            if(req.user.superadmin) {
                res.render('add_employee', {
                    title: 'Add Employee',
                    departments: depts
                });
            } else {
                req.flash('danger', 'Only admins can add an user');
                res.redirect('/admin/viewall');
            }
        }
    })
})

// view particular employee
router.get('/view/:id', function (req, res) {
    Employee.findById(req.params.id)
        .populate('address')
        .exec(function(err, employee) {
            console.log(employee);
            res.render('employee', {
                employee: employee
            });
        });
})

// load edit employee form  
router.get('/edit/:id', function (req, res) {
    Employee.findById(req.params.id)
        .populate('address')
        .exec(function(err, employee) {
            Dept.find({}, function(err, depts){
                if (err) {
                    console.log(err);
                } else {
                    res.render('edit_employee', {
                        title: 'Edit',
                        employee: employee,
                        departments: depts
                    });
                }
            })
        });
    // Employee.findById(req.params.id, function(err, employee) {
    //     Dept.find({}, function(err, depts){
    //         if (err) {
    //             console.log(err);
    //         } else {
    //             res.render('edit_employee', {
    //                 title: 'Edit',
    //                 employee: employee,
    //                 departments: depts
    //             });
    //         }
    //     })
        
    // });
    
})



// update submit Post 
router.post('/edit/:id', function (req, res) {
    let employee = {};
    employee.name= req.body.name;
    employee.age= req.body.age;
    employee.gender= req.body.gender;
    employee.dept = {};
    employee.dept.name = req.body.dept_name;
    employee.dept.region = req.body.dept_region;

    let address = {};
    address.houseNumber = req.body.houseno;
    address.city = req.body.city;
    address.state = req.body.state;
    address.pin = req.body.pin;
    
    console.log('employee : ',  employee);

    let query = {_id: req.body.id}

    Address.update({ _id: req.body.address_id }, address, function(err) {
        if (err) {
            console.log('Address.update error', err);
            //return next(err);
        } else {
            console.log('address also updated');
        }
    })

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
        Dept.find({}, function(err, depts){
            if (err) {
                console.log(err);
            } else {
                res.render('add_employee', {
                    title: 'Add Employee',
                    departments: depts,
                    errors: errors
                });
            }  
        })
    } else {
        let address = new Address({
                houseNumber: req.body.houseno,
                city: req.body.city,
                state: req.body.state,
                pin: req.body.pin,
            })
        address.save();

        let employee = new Employee({
                name: req.body.name,
                age: req.body.age,
                gender: req.body.gender,
                address: address._id,
                salary: req.body.salary,
                dept: {
                    name: req.body.dept_name,
                    region: req.body.dept_region
                }
            });
        
        employee.save(function (err) {
            if (err) {
                console.log(err);
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

// Access Control
function ensureAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    } else {
        req.flash('danger', 'Please login');
        res.redirect('/users/login');
    }
}

router.post('/adddept', function(req, res) {
    let dept = new Dept({
        name: req.body.name,
        region: req.body.region
    });
    dept.save(function (err) {
        if (err) {
            console.log(err);
            return next(err);
        }
        else {
            res.send('sucess');
        }
    })
})
module.exports = router;