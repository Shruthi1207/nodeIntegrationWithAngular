var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');
var AssessmentAppDetails = require('./assessmentAppDetails');
var AssessmentBarrier = require('./assessmentBarrier');
var AssessmentMigrationGoal = require('./assessmentMigrationGoal');

var schema = new Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    appName: {type: String, required: true},
    appId: {type: String, required: true, unique: true},
    pcm: {type: String, },
    vp: {type: String},
   // title: {type: String, required: true},
    
    modified : {
        type : Date,
        default : Date.now
    },
    matrixSelectionsLocked: { type: Boolean, default: false },
    calculatorSelectionsLocked: { type: Boolean, default: false }
});

schema.plugin(mongooseUniqueValidator);

schema.pre('remove', function(next) {
    console.log("inside middleware!!!!");
    // 'this' is the client being removed. Provide callbacks here if you want
    // to be notified of the calls' result.
    AssessmentAppDetails.remove({assessmentId: this._id}).exec();
    AssessmentBarrier.remove({assessmentId: this._id}).exec();
    AssessmentMigrationGoal.remove({assessmentId: this._id}).exec();
    next();
});

module.exports = mongoose.model('Assessment', schema);

