// Load required packages
var User = require('../models/user');

// Create endpoint /api/users for POST
exports.postUsers = function (req, res, next) {
    var user = new User({
        username: req.body.username,
        password: req.body.password
    });
    
    user.save(function (err) {
        if (err)
            
            return next(err);
        
        //res.json({ message: 'New beer drinker added to the locker room!' });
        //return next();

        res.jsonbody = { message: 'New beer drinker added to the locker room!' }
        return next();
    });
};

// Create endpoint /api/users for GET
exports.getUsers = function (req, res) {
    User.find(function (err, users) {
        if (err)
            res.send(err);
        
        res.json(users);
    });
};