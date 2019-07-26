var express = require('express');
var router = express.Router();

var Pricing = require('../models/pricing');

router.get('/', function (req, res, next) {
    Pricing.find()
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
    var pricing = new Pricing({
        type: req.body.type,
        size: req.body.size,
        centos: req.body.centos,
        RH: req.body.RH,
        W: req.body.W,
        VM:req.body.VM,
        
    });
    pricing.save(function (err, result) {
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

// router.patch('/:id', function (req, res, next) {
//     storagecloudprice.findById(req.params.id, function (err, pricing) {
//         if (err) {
//             return res.status(500).json({
//                 title: 'An error occurred',
//                 error: err
//             });
//         }
//         if (!pricing) {
//             return res.status(500).json({
//                 title: 'No price Found!',
//                 error: {message: 'Price not found'}
//             });
//         }
//         res.status(200).json({
//             message: 'Success',
//             obj: pricing
//         });
        
//     });
// });

router.patch('/:id', function (req, res, next) {
    Pricing.findById(req.params.id, function (err, pricing) {
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
        pricing.type = req.body.type;
        pricing.size = req.body.size;
        pricing.centos = req.body.centos;
        pricing.RH = req.body.RH;
        pricing.W = req.body.W;
        pricing.VM = req.body.VM;
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