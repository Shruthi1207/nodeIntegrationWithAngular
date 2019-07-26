var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    text: {type: String, required: true},
    hover: {type: String},
    grouping: {type: String, required: true},
    rank: {type: Number, required: true},
    scores: {type: [], required: true}
});

module.exports = mongoose.model('Barrier', schema);