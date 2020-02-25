const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

/*
* local strategy used to obtain JWT token in /login
*/
passport.use(new LocalStrategy(
    function (username, password, done) {
        if (username === process.env['ADMIN_USER'] && password === process.env['ADMIN_PW']) {
            return done(null, {username: username, password: password});
        } else {
            return done(null, false);
        }
    }
));

/*
* JWT strategy, used to authenticate when consuming the /danceoffs endpoint
*/
passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env['JWT_SECRET']
    },
    function (jwtPayload, cb) {
        if (jwtPayload.username === process.env['ADMIN_USER'] && jwtPayload.password === process.env['ADMIN_PW']) {
            cb(null, {username: jwtPayload.username, password: jwtPayload.password});
        } else {
            cb({error: "invalid token"});
        }

    }
));
