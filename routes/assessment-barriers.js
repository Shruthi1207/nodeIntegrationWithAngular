var express = require('express');
var router = express.Router();

var AssessmentBarrier = require('../models/assessmentBarrier');

router.get('/:id', function (req, res, next) {
    AssessmentBarrier.findOne( { assessmentId: req.params.id } , function (err, assessmentBarrier) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!assessmentBarrier) {
            return res.status(200).json({
                message: 'No Cloud Barrier Assessment Selections Found!',
                obj: null
            });
        }
        res.status(200).json({
            message: 'Success',
            obj: assessmentBarrier
        });        
    });      
});

router.post('/', function (req, res, next) {
    var assessmentBarrier = new AssessmentBarrier({
        assessmentId: req.body.assessmentId,
        selections: req.body.selections,
        scores: req.body.scores

    });
    assessmentBarrier.save(function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(201).json({
            message: 'Saved Cloud Barrier Assessment Selections',
            obj: result
        });
    });
});

router.patch('/:id', function (req, res, next) {
    AssessmentBarrier.findById(req.params.id, function (err, assessmentBarrier) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!assessmentBarrier) {
            return res.status(404).json({
                title: 'No Cloud Barrier Question Found!',
                error: {message: 'Cloud Barrier Assessment not found'}
            });
        }
        assessmentBarrier.assessmentId = req.body.assessmentId;
        assessmentBarrier.selections = req.body.selections;
        assessmentBarrier.scores = req.body.scores;
        assessmentBarrier.save(function(err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Updated Cloud Barrier Assessment',
                obj: result
            });
        });
    });
});

router.delete('/:id', function(req, res, next) {
    AssessmentBarrier.findById(req.params.id, function (err, assessmentBarrier) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!assessmentBarrier) {
            return res.status(500).json({
                title: 'No Cloud Barrier Assessment Found!',
                error: {message: 'Cloud Barrier Assessment not found'}
            });
        }
        assessmentBarrier.remove(function(err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Deleted Cloud Barrier Assessment',
                obj: result
            });
        });
    });
});

module.exports = router;