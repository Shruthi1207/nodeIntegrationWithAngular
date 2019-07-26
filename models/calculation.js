var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    assessmentId: {type: String, required: true},
    servers: {type: [], required: true},
    results: {type: [], required: true},
    hostingCostUpdated: {type: Boolean, required: true},
});

module.exports = mongoose.model('AssessmentCalculation', schema);