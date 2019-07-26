var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    type: {type: String, required: true},
    size: {type: String, required: true},
    centos: {type: String, required: true},
    RH: {type: String, required: true},
    W: {type: String, required: true},
    VM: {type: String, required: true},
});

module.exports = mongoose.model('Pricing', schema);