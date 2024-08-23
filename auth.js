const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Person = require("./models/Person");

passport.use(new LocalStrategy(async function (username, password, done) {
    // Authentication logic here
    try {
        const user = await Person.findOne({ userName: username });
        if (!user) {
            return done(null, false, { message: "Incorrect username" });
        }
        const isPasswordMatch = await user.comparePassword(password); // Fixed typo here
        if (isPasswordMatch) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'Invalid password' });
        }
    } catch (err) {
        return done(err);
    }
}));

module.exports = passport;
