var express = require('express');
var router = express.Router();

var AppDetailsQuestions = require('../models/appDetailsQuestions');


router.get('/', function (req, res, next) {
     AppDetailsQuestions.find()
        .exec(function (err, appDetailsQuestions) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: appDetailsQuestions
            });
        });
});

router.post('/', function (req, res, next) {
    var appDetailsQuestions = new AppDetailsQuestions({
        text: req.body.text        

    });
    appDetailsQuestions.save(function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(201).json({
            message: 'Saved appDetailsQuestions',
            obj: result
        });
    });
});

module.exports = router;