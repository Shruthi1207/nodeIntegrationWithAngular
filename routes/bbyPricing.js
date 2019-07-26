var express = require('express');
var router = express.Router();

var BbyPricing = require('../models/bbyPricing');

router.get('/azure', function (req, res, next) {
    var request = require('request');
    var url = "https://consumption.azure.com:443/v2/enrollments/6407158/pricesheet";
    var auth = "bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IlE5WVpaUnA1UVRpMGVPMmNoV19aYmh1QlBpWSJ9.eyJFbnJvbGxtZW50TnVtYmVyIjoiNjQwNzE1OCIsIklkIjoiZjY3ZTM4ZTItM2VjYi00NTZiLWI4NzMtZmRjYzViMjI5YTNiIiwiUmVwb3J0VmlldyI6IkVudGVycHJpc2UiLCJQYXJ0bmVySWQiOiIiLCJEZXBhcnRtZW50SWQiOiIiLCJBY2NvdW50SWQiOiIiLCJpc3MiOiJlYS5taWNyb3NvZnRhenVyZS5jb20iLCJhdWQiOiJjbGllbnQuZWEubWljcm9zb2Z0YXp1cmUuY29tIiwiZXhwIjoxNTEwMzIzOTcxLCJuYmYiOjE0OTQ0MjYzNzF9.plouWz-aX0vbIfedebWdEZa5XjvNA1fevxF244UBH_OhFtrByoVrhCO-v3svYGQY7ATQuBr37nMaYkhmvjQqQrBQOLcV0ku1Td1fldqiGpboBmHE0hs4vnXNp3dh0SPRXKberJK0BFX2cyaeEhrz9jSDoi6utxQqwIRQNXhDYXF3Z2TIvtZP-hB3xekEa4f7STKO3q_YftGakMhnhurjxxsCf9_51mEi_GIbjrGwbSKirZ41LEKilpq29CPyUk4Ytii7OvM9VYI_S7_8p1Cbq22TCmF4sXS0DIWE45I_WCSM46WaMttSRF4gvVb-_XD0afCGTyWh1zvtG9PYTwr6Ow";
    request(
        {
            url : url,
            headers : {
                "Authorization" : auth
            }
        },
        function (error, response, body) {
            
            var jsonData = JSON.parse(body);
            console.log('error:', error); // Print the error if one occurred and handle it
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            res.send(body)
});
});

router.get('/gcp', function (req, res, next) {
    var request = require('request');
    request('https://cloudpricingcalculator.appspot.com/static/data/pricelist.json', function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred and handle it
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        res.send(body)
      });
});

router.get('/aws1', function (req, res, next) {
    var request = require('request');
    request('https://pricing.us-east-1.amazonaws.com/offers/v1.0/aws/AmazonEFS/current/index.json', function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred and handle it
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        res.send(body)
      });
});

router.get('/aws2', function (req, res, next) {
    var request = require('request');
    request('https://pricing.us-east-1.amazonaws.com/offers/v1.0/aws/AmazonEC2/current/index.json', function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred and handle it
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        res.send(body)
      });
});

router.get('/aws3', function (req, res, next) {
    var request = require('request');
    request('https://pricing.us-east-1.amazonaws.com/offers/v1.0/aws/AmazonS3/current/index.json', function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred and handle it
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        res.send(body)
      });
});

router.get('/aws4', function (req, res, next) {
    var request = require('request');
    request('https://pricing.us-east-1.amazonaws.com/offers/v1.0/aws/AmazonES/current/index.json', function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred and handle it
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        res.send(body)
      });
});

router.get('/aws5', function (req, res, next) {
    var request = require('request');
    request('https://pricing.us-east-1.amazonaws.com/offers/v1.0/aws/AmazonVPC/current/index.json', function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred and handle it
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        res.send(body)
      });
});


router.get('/', function (req, res, next) {
    BbyPricing.findOne()
       .exec(function (err, bbyPricing) {
           if (err) {
               return res.status(500).json({
                   title: 'An error occurred',
                   error: err
               });
           }
           if (!bbyPricing) {
            return res.status(200).json({
                title: 'No BBY Pricing Found!',
                obj: null
            });
            }
            res.status(200).json({
                message: 'Success',
                obj: bbyPricing
            });
        });
});


router.post('/', function (req, res, next) {
    var bbyPricing = new BbyPricing({
       entries: req.body.entries

    });
    bbyPricing.save(function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(201).json({
            message: 'Saved BBY Pricing Selections',
            obj: result
        });
    });
});

router.patch('/:id', function (req, res, next) {
    BbyPricing.findById(req.params.id, function (err, bbyPricing) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!bbyPricing) {
            return res.status(500).json({
                title: 'No  BBY Pricing Found!',
                error: {message: ' BBY Pricing not found'}
            });
        }
        bbyPricing.entries = req.body.entries;
        bbyPricing.save(function(err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Updated  BBY Pricing',
                obj: result
            });
        });
    });
});


module.exports = router;