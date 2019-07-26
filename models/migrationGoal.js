var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    text: {type: String, required: true},
    grouping: {type: String, required: true},
    rank: {type: Number, required: true},
    scores: {type: [], required: true},
    hover: {type: String}
});

module.exports = mongoose.model('MigrationGoal', schema);

