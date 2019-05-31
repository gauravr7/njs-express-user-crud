const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// Bring in User Model
let User = require('../models/user');

//Register Form
router.get('/register', function(req, res) {
    res.render('register_user');
});

//Register Process
router.post('/register', function(req, res) {
    const name = req.body.name;
    const username = req.body.username;
    const password = req.body.password;
    const password2 = req.body.password2;

    req.checkBody('name', 'name Cannot be Blank').notEmpty();
    req.checkBody('username', 'username Cannot be Blank').notEmpty();
    req.checkBody('password', 'password Cannot be Blank').notEmpty();
    req.checkBody('password2', 'password Cannot be Blank').notEmpty();
    req.checkBody('password2', 'password doesnt match').equals(req.body.password);

    let errors = req.validationErrors();
    if(errors) {
        res.render('register_user', {
            errors: errors
        });
    } else {
        let newUser = new User({
            name: name,
            username: username,
            password: password
        });

        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(newUser.password, salt, function (err, hash) {
                if (err) {
                    console.log('error in hashing')
                } else {
                    newUser.password = hash;
                    newUser.save(function(err){
                        if(err) {
                            console.log(err);
                            return;
                        } else {
                            req.flash('success', 'you are now register and can login');
                            res.redirect('/users/login');
                        }
                    });
                }
            });
        })
        
    }
});


router.get('/login', function(req, res) {
    res.render('login_user');
});

//Login Process
router.post('/login', function(req, res, next) {
    passport.authenticate('local', {
        successRedirect: '/admin/viewall',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

//Loout Process
router.get('/logout', function(req, res) {
    req.logout();
    req.flash('success', 'You are logged out');
    res.redirect('/users/login');
});

module.exports = router;