var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
storagetype: {type: String, required: true},
tierindex: {type: Number, required: true},
tier: {type: String, required: true},
cost: {type: String, required: true}
});

module.exports = mongoose.model('storagecloudprice', schema); 