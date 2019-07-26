var express = require('express');
var router = express.Router();

var storagecloudprice = require('../models/storageCloudPrice');

router.get('/', function (req, res, next) {
    storagecloudprice.find()
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
    var Storagecloudprice = new storagecloudprice({
        storagetype: req.body.storagetype,
        tierindex: req.body.tierindex,
        tier: req.body.tier,
        cost: req.body.cost
    });
    Storagecloudprice.save(function (err, result) {
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
    storagecloudprice.findById(req.params.id, function (err, pricing) {
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
        pricing.storagetype = req.body.storagetype;
        pricing.tierindex = req.body.tierindex;
        pricing.tier = req.body.tier;
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
                obj: result
            });
        });
    });
});



module.exports = router;