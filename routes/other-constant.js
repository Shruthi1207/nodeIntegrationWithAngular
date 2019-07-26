var express = require('express');
var router = express.Router();

var otherconstant = require('../models/otherconstant');

router.get('/', function (req, res, next) {
    otherconstant.find()
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
    var Otherconstant = new otherconstant({
        name: req.body.name,
        value: req.body.value,
    });
    Otherconstant.save(function (err, result) {
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
    otherconstant.findById(req.params.id, function (err, pricing) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!pricing) {
            return res.status(500).json({
                title: 'No price Found!',
                error: {message: 'Price not found'}
            });
        }
        pricing.name = req.body.name;
        pricing.value = req.body.value;
        pricing.save(function(err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Updated Question',
                obj: result
            });
        });
    });
});


module.exports = router;