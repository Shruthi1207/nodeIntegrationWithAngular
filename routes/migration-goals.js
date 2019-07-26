var express = require('express');
var router = express.Router();

var MigrationGoal = require('../models/migrationGoal');

router.get('/', function (req, res, next) {
     MigrationGoal.find()
        .exec(function (err, migrationGoals) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: migrationGoals
            });
        });
});

router.post('/', function (req, res, next) {
    var migrationGoal = new MigrationGoal({
        text: req.body.text,
        grouping: req.body.grouping,
        rank: req.body.rank,
        selected: req.body.selected,
        hover: req.body.hover,
        scores: req.body.scores,

    });
    migrationGoal.save(function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(201).json({
            message: 'Saved Cloud Benefit Question',
            obj: result
        });
    });
});

router.patch('/:id', function (req, res, next) {
    MigrationGoal.findById(req.params.id, function (err, migrationGoal) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!migrationGoal) {
            return res.status(500).json({
                title: 'No Cloud Benefit Question Found!',
                error: {message: 'Question not found'}
            });
        }
        
        migrationGoal.text = req.body.text;
        migrationGoal.grouping = req.body.grouping;
        migrationGoal.rank= req.body.rank,
        migrationGoal.selected= req.body.selected,
        migrationGoal.hover= req.body.hover,
        migrationGoal.scores= req.body.scores,

        migrationGoal.save(function(err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Updated Cloud Benefit Question',
                obj: result
            });
        });
    });
});

router.delete('/:id', function(req, res, next) {
    MigrationGoal.findById(req.params.id, function (err, migrationGoal) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!migrationGoal) {
            return res.status(500).json({
                title: 'No Cloud Benefit Question Found!',
                error: {message: 'Cloud Benefit Question not found'}
            });
        }
        migrationGoal.remove(function(err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Deleted Cloud Benefit Question',
                obj: result
            });
        });
    });
});

module.exports = router;