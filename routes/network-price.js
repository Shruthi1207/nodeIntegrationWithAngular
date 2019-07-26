var express = require('express');
var router = express.Router();

var networkprice = require('../models/networkPrice');

router.get('/', function (req, res, next) {
    networkprice.find()
        .exec(function (err, pricings) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: pricings
            });
        });
});

router.post('/', function (req, res, next) {
    var Networkprice = new networkprice({
        networktype: req.body.networktype,
        index: req.body.index,
        networkRange: req.body.networkRange,
        cost: req.body.cost,
    });
    Networkprice.save(function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(201).json({
            message: 'Saved Question',
            obj: result
        });
    });
});

router.patch('/:id', function (req, res, next) {
    networkprice.findById(req.params.id, function (err, pricing) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!pricing) {
            return res.status(500).json({
                title: 'No Question Found!',
                error: {message: 'Question not found'}
            });
        }
        pricing.networktype = req.body.networktype;
        pricing.index = req.body.index;
        pricing.networkRange = req.body.networkRange;
        pricing.cost = req.body.cost;
        pricing.save(function(err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Updated Question',
                obj: pricing
            });
        });
    });
});


module.exports = router;