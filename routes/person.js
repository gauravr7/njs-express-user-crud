const express = require('express');
const router = express.Router();

// Bring in Employee Model
let Employee = require('../models/employee').Employee;

// Bring in User Model
let User = require('../models/user');

// View all Employees
router.get('/profile', function (req, res) {
    res.render('profile', {
        title: 'Gem'
    });
    // let employeesList = Employee.find({}, function (err, employees) {
    //     if (err) {
    //         console.log(err);
    //     }
    //     else {
    //         res.render('viewall_employees', {
    //             employees: employees
    //         });
    //     }

    // })

})

module.exports = router;