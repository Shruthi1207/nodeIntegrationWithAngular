var express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId; 
//var bcrypt = require('bcryptjs');
//var jwt = require('jsonwebtoken');
var User = require('../models/user');
var Assessment = require('../models/assessment');

// Get all assessments of current user.
router.get('/filtered', function (req, res, next) {
    var role = req.query.role;
    var userId = req.query.userId;
    if (role == "admin") {
        Assessment.find()
        .exec(function (err, assessments) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                assessments: 'Success',
                obj: assessments
            });
        });
    }

    else {
        Assessment.find({ user: new ObjectId(userId)  })
        .populate('user', 'firstName')
        .exec(function (err, assessments) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                assessments: 'Success',
                obj: assessments
            });
        });
    }

});


router.get('/', function(req, res, next) {
    Assessment.findById(req.query.id, (err, assessment) => {  
        if (err) {
            res.status(500).send(err)
        }
        if (!assessment) {
            return res.status(200).json({
                message: 'No Assessment Found for Id: ' + req.query.id,
                obj: null
            });
        }
        res.status(200).json({
           
            message: "Found Assessment!",
            obj: assessment
        });
    });
});



router.post('/', function (req, res, next) {

    // check whether user exist or not.  
    var userId = req.query.userId;
    console.log("userid from client"+ userId);
    User.findById(userId, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred while fetching user',
                error: err
            });
        }

    });
    var assessment = new Assessment({
        appName: req.body.appName,
        appId: req.body.appId,
        pcm: req.body.pcm,
        vp: req.body.vp,
      //  title: req.body.title,
        
        user: userId

    });

    assessment.save(function (err, result) {

        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(201).json({
            message: 'Assessment created',
            obj: result
        });
    });
});


router.patch('/lockmatrix', function (req, res, next) {
    Assessment.findByIdAndUpdate({ "_id": req.body.id }, { "$set": { "matrixSelectionsLocked": req.body.lockValue}}).exec(function(err, assessment){
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(200).json({
            
            message: 'Updated matrix lock',
            obj: assessment
        });
        
    });
});

router.patch('/lockcalculator', function (req, res, next) {
    Assessment.findByIdAndUpdate({ "_id": req.body.id }, { "$set": { "calculatorSelectionsLocked": req.body.lockValue}}).exec(function(err, assessment){
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(200).json({
            message: 'Updated calculator lock',
            obj: assessment
        });
        
    });
});



router.patch('/', function (req, res, next) {
    
    var Id = req.query.Id;
   console.log("ID1"+ Id );
    
    Assessment.findById(Id, function (err, assessment) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!assessment) {
            return res.status(500).json({
                title: 'No Assessment Found!',
                error: {message: 'Assessment not found'}
            });
        }
        assessment.appName = req.body.appName;
        assessment.appId = req.body.appId;
        assessment.pcm = req.body.pcm;
        assessment.vp = req.body.vp;
      //  assessment.title = req.body.title;
        
        assessment.modified = Date.now();
        assessment.save(function(err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Updated Assessment',
                obj: result
            });
        });
    });
});

router.delete('/:id', function(req, res, next) {
    Assessment.findById(req.params.id, function (err, assessment) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!assessment) {
            return res.status(500).json({
                title: 'No Assessment Found!',
                error: {message: 'Assessment not found'}
            });
        }
        assessment.remove(function(err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Deleted Assessment',
                obj: result
            });
        });
    });
});

module.exports = router;