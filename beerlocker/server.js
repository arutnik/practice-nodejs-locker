// Load required packages
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var beerController = require('./controllers/beer');
var userController = require('./controllers/user.js');
var authController = require('./controllers/auth.js');

// Connect to the beerlocker MongoDB
mongoose.connect('mongodb://localhost:27017/beerlocker');

// Create our Express application
var app = express();

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
    extended: true
}));

// Use the passport package in our application
app.use(passport.initialize());

app.use(function (req, res, next) {
    console.log('%s %s', req.method, req.url);
    next();
});

// Create our Express router
var router = express.Router();

// Create endpoint handlers for /beers
router.route('/beers')
  .post(authController.isAuthenticated, beerController.postBeers)
  .get(authController.isAuthenticated, beerController.getBeers);

// Create endpoint handlers for /beers/:beer_id
router.route('/beers/:beer_id')
  .get(authController.isAuthenticated, beerController.getBeer)
  .put(authController.isAuthenticated, beerController.putBeer)
  .delete(authController.isAuthenticated, beerController.deleteBeer);


// Create endpoint handlers for /users
router.route('/users')
    .post(userController.postUsers)
    .get(authController.isAuthenticated, userController.getUsers);


// Register all our routes with /api
app.use('/api', router);

app.use(function (err, req, res, next) {
    
    console.error(err.stack);
    
    res.status(500).send(err);

});

//callback for json wrapping - just an example
app.use(function (req, res, next) {
    
    if (res.jsonbody) {
        console.log('%s', res.jsonbody);
        res.json(res.jsonbody);
    }
    
    
    return next();
});


// Start the server
app.listen(3000);