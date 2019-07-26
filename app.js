var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var appRoutes = require('./routes/app');
var barrierRoutes = require('./routes/barriers');
var assessmentBarrierRoutes = require('./routes/assessment-barriers');
var migrationGoalRoutes = require('./routes/migration-goals');
var assessmentMigrationGoalRoutes = require('./routes/assessment-migration-goals');
var userRoutes = require('./routes/user');
var assessmentRoutes = require('./routes/assessment');
var assessmentAppDetailsRoutes = require('./routes/assessment-appDetails');
var pricingRoutes = require('./routes/pricings');
var storagecloudpriceRoutes = require('./routes/storage-cloud-price');
var networkpriceRoutes = require('./routes/network-price');
var otherconstantRoutes = require('./routes/other-constant');
var calculationRoutes = require('./routes/calculation');
var bbyPricingRoutes = require('./routes/bbyPricing');
var appDetailsQuestions = require('./routes/appDetails-Questions');


var app = express();
mongoose.connect('localhost:27017/cloudgate');
//mongoose.connect('mongodb://mongo:mongo@mongodb/cloudgate');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});

app.use('/barrier', barrierRoutes);
app.use('/assessment-barrier', assessmentBarrierRoutes);
app.use('/migrationgoal', migrationGoalRoutes);
app.use('/assessment-migration-goal', assessmentMigrationGoalRoutes);
app.use('/user', userRoutes);
app.use('/assessment', assessmentRoutes);
app.use('/', appRoutes);
app.use('/assessment-appDetails', assessmentAppDetailsRoutes);
app.use('/pricing', pricingRoutes);
app.use('/storagecloudprice', storagecloudpriceRoutes);
app.use('/networkprice', networkpriceRoutes);
app.use('/constants', otherconstantRoutes);
app.use('/calculation', calculationRoutes);
app.use('/bbyPricing', bbyPricingRoutes);
app.use('/appDetailsQuestions', appDetailsQuestions);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    return res.render('index');
});


module.exports = app;
