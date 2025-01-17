const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');

router.post('/', function (req, res) {
    passport.authenticate('local', {session: false}, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                message: 'Invalid credentials'
            });
        }
        req.login(user, {session: false}, (err) => {
            if (err) {
                res.send(err);
            }
            // generate a signed son web token with the contents of user object and return it in the response
            const token = jwt.sign(user, process.env['JWT_SECRET']);
            return res.json({token});
        });
    })(req, res);
});

module.exports = router;
