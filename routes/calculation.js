var express = require('express');
var router = express.Router();

var Calculation = require('../models/calculation');

router.get('/', function (req, res, next) {
    Calculation.find()
        .exec(function (err, assessmentCalculation) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: assessmentCalculation
            });
        });
});

router.get('/:id', function (req, res, next) {
    // One assessment can have one calculation only.
    Calculation.findOne( { assessmentId: req.params.id } , function (err, assessmentCalculation) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!assessmentCalculation) {
            return res.status(200).json({
                message: 'No Assessment Calculation Found!',
                obj: null
            });
        }
        res.status(200).json({
            message: 'Success',
            obj: assessmentCalculation
        });        
    });      
});

router.post('/', function (req, res, next) {
    console.log("inside");
    var calculation = new Calculation({
        assessmentId: req.body.assessmentId,        
        servers: req.body.servers,
        results: req.body.results,
        hostingCostUpdated: req.body.hostingCostUpdated
    });
    calculation.save(function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(201).json({
            message: 'Saved calculation',
            obj: result
        });
    });
});

router.patch('/:id', function (req, res, next) {
    Calculation.findById(req.params.id, function (err, assessmentCalculation) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!assessmentCalculation) {
            return res.status(404).json({
                title: 'No Assessment Calculation Found!',
                error: {message: 'Assessment Calculation not found'}
            });
        }
        assessmentCalculation.assessmentId = req.body.assessmentId;
        assessmentCalculation.servers = req.body.servers;
        assessmentCalculation.results = req.body.results;
        assessmentCalculation.hostingCostUpdated = req.body.hostingCostUpdated;
        assessmentCalculation.save(function(err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Updated Assessment Calculation ',
                obj: result
            });
        });
    });
});


module.exports = router;