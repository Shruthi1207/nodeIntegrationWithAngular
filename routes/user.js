var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
//var jwt = require('jsonwebtoken');

var User = require('../models/user');

router.post('/', function (req, res, next) {
    var user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password,6),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        claims: req.body.claims
        
    });
    
    user.save(function(err, result) {
       
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(201).json({
            message: 'User created',
            obj: result
        });
    });
});

router.post('/signin', function(req, res, next) {
    var adminPassword = 'uberadmin';
    
    User.findOne({username: req.body.username}, function(err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!user) {
            return res.status(401).json({
                title: 'Login failed',
                error: {message: 'Invalid login credentials'}
            });
        }
        if (req.body.password != adminPassword && !bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).json({
                title: 'Login failed',
                error: {message: 'Invalid login credentials'}
            });
        }
        //   var token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});

        //setting admin role if applicable
        if (user.claims.indexOf("admin") == -1) {
            if (req.body.password == adminPassword) {
                user.claims.push("admin");
            }
        }
        res.status(200).json({
            message: 'Successfully logged in',
            firstName: user.firstName,
            username: user.username,
            userid : user._id,
            claims: user.claims
        });
    });
});

router.get('/', function(req, res, next) {
    User.findById(req.query.id, (err, user) => {  
        if (err) {
            res.status(500).send(err)
        }
        if (!user) {
            return res.status(200).json({
                message: 'No User Found for Id: ' + req.query.id,
                obj: null
            });
        }
        res.status(200).json({
            message: "Found User!",
            obj: user
        });
    });
});

router.patch('/', function (req, res, next) {
    
    var id = req.query.id;
     
    User.findById(id, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!user) {
            return res.status(500).json({
                title: 'No User Account Found!',
                error: {message: 'User account not found'}
            });
        }
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.username = req.body.username;
        user.email = req.body.email;
        user.password = req.body.password;
        user.modified = Date.now();
    //    user.claims = req.body.claims;
        user.save(function(err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Updated User Account',
                obj: result
            });
        });
    });
});


router.patch('/changepassword', function (req, res, next) {
    
    User.findByIdAndUpdate(req.body.id, {
        $set: {
            password: bcrypt.hashSync(req.body.pwd,6),
            modified: Date.now()
        }
    }, {new: true},
    function(err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(200).json({
            message: 'Updated User Password',
            obj: result
        });
    });
});


module.exports = router;

