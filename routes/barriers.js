var express = require('express');
var router = express.Router();

var Barrier = require('../models/barrier');
var AssessmentBarrier = require('../models/assessmentBarrier');

router.get('/', function (req, res, next) {
     Barrier.find()
        .exec(function (err, barriers) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: barriers
            });
        });
});

router.post('/', function (req, res, next) {
    var barrier = new Barrier({
        text: req.body.text,
        grouping: req.body.grouping,
        rank: req.body.rank,
        selected: req.body.selected,
        hover: req.body.hover,
        scores: req.body.scores,

    });
    barrier.save(function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(201).json({
            message: 'Saved Cloud Barrier Question',
            obj: result
        });
    });
});

router.patch('/:id', function (req, res, next) {
    Barrier.findById(req.params.id, function (err, barrier) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!barrier) {
            return res.status(500).json({
                title: 'No Cloud Barrier Question Found!',
                error: {message: 'Cloud Barrier Question not found'}
            });
        }
        barrier.text = req.body.text;
        barrier.grouping = req.body.grouping;
        barrier.rank= req.body.rank,
        barrier.selected= req.body.selected,
        barrier.hover= req.body.hover,
        barrier.scores= req.body.scores,


        barrier.save(function(err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Updated Cloud Barrier Question',
                obj: result
            });
        });
    });
});

router.delete('/:id', function(req, res, next) {
    Barrier.findById(req.params.id, function (err, barrier) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!barrier) {
            return res.status(500).json({
                title: 'No Cloud Barrier Question Found!',
                error: {message: 'Cloud Barrier Question not found'}
            });
        }
        barrier.remove(function(err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Deleted Cloud Barrier Question',
                obj: result
            });
        });
    });
});

module.exports = router;