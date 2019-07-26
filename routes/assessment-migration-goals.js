var express = require('express');
var router = express.Router();

var AssessmentMigrationGoal = require('../models/assessmentMigrationGoal');

router.get('/:id', function (req, res, next) {
    AssessmentMigrationGoal.findOne( { assessmentId: req.params.id } , function (err, assessmentMigrationGoal) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!assessmentMigrationGoal) {
            return res.status(200).json({
                message: 'No Migration Goal Assessment Selections Found!',
                obj: null
            });
        }
        res.status(200).json({
            message: 'Success',
            obj: assessmentMigrationGoal
        });        
    });      
});

router.post('/', function (req, res, next) {
    var assessmentMigrationGoal = new AssessmentMigrationGoal({
        assessmentId: req.body.assessmentId,
        selections: req.body.selections,
        scores: req.body.scores

    });
    assessmentMigrationGoal.save(function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(201).json({
            message: 'Saved Migration Goal Assessment Selections',
            obj: result
        });
    });
});

router.patch('/:id', function (req, res, next) {
    AssessmentMigrationGoal.findById(req.params.id, function (err, assessmentMigrationGoal) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!assessmentMigrationGoal) {
            return res.status(404).json({
                title: 'No Migration Goal Question Found!',
                error: {message: 'Migration Goal Assessment not found'}
            });
        }
        assessmentMigrationGoal.assessmentId = req.body.assessmentId;
        assessmentMigrationGoal.selections = req.body.selections;
        assessmentMigrationGoal.scores = req.body.scores;
        assessmentMigrationGoal.save(function(err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Updated Migration Goal Assessment',
                obj: result
            });
        });
    });
});

router.delete('/:id', function(req, res, next) {
    MigrationGoal.findById(req.params.id, function (err, assessmentMigrationGoal) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!assessmentMigrationGoal) {
            return res.status(500).json({
                title: 'No Migration Goal Assessment Found!',
                error: {message: 'Migration Goal Assessment not found'}
            });
        }
        assessmentMigrationGoal.remove(function(err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Deleted Migration Goal Assessment',
                obj: result
            });
        });
    });
});

module.exports = router;