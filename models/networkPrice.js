var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    networktype: {type: String, required: true},
    index: {type: Number, required: true},
    networkRange: {type: String, required: true},
    cost: {type: String, required: true}
});

module.exports = mongoose.model('networkprice', schema);