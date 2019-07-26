var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    entries: {type: String, required: true}
});

module.exports = mongoose.model('BbyPricing', schema);