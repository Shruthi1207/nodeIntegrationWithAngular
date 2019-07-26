var express = require('express');
var router = express.Router();

var AssessmentAppDetails = require('../models/assessmentAppDetails');

router.get('/:id', function (req, res, next) {
    AssessmentAppDetails.findOne( { assessmentId: req.params.id } , function (err, assessmentAppDetails) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!assessmentAppDetails) {
            return res.status(200).json({
                title: 'No Application Details Assessment Selections Found!',
                obj: null
            });
        }
        res.status(200).json({
            message: 'Success',
            obj: assessmentAppDetails
        });        
    });      
});

router.post('/', function (req, res, next) {
    var assessmentAppDetails = new AssessmentAppDetails({
        assessmentId: req.body.assessmentId,
        selections: req.body.selections

    });
    assessmentAppDetails.save(function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(201).json({
            message: 'Saved Application Details Assessment Selections',
            obj: result
        });
    });
});

router.patch('/:id', function (req, res, next) {
    AssessmentAppDetails.findById(req.params.id, function (err, assessmentAppDetails) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!assessmentAppDetails) {
            return res.status(500).json({
                title: 'No  Application Details Question Found!',
                error: {message: ' Application Details Assessment not found'}
            });
        }
        assessmentAppDetails.assessmentId = req.body.assessmentId;
        assessmentAppDetails.selections = req.body.selections;
        assessmentAppDetails.save(function(err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Updated  Application Details Assessment',
                obj: result
            });
        });
    });
});


module.exports = router;