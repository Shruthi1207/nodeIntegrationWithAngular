var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    assessmentId: {type: String, required: true},
    selections: {type: String, required: true},
    scores: {type: [], required: true},
    modified : {
        type : Date,
        default : Date.now
    }
});

module.exports = mongoose.model('AssessmentMigrationGoal', schema);