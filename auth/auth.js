const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const UserModel = require("../models/User");
const CONFIG = require("../config/config");

// Passport middleware to handle registration
passport.use(
  "signup",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    async (email, password, done) => {
      try {
        const user = await UserModel.create({ email, password });
        return done(null, user);
      } catch (err) {
        done(err);
      }
    }
  )
);

// Passport middleware to handle login
passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    async (email, password, done) => {
      try {
        const user = await UserModel.findOne({ email });
        if (!user) {
          return done(null, false, { message: "User not found!" });
        }
        const validate = await user.isValidPassword(password);
        if (!validate) {
          return done(null, false, { message: "Wrong password!" });
        }
        return done(null, user, { message: "Logged in!" });
      } catch (err) {
        return done(err);
      }
    }
  )
);

// Verify that the token sent by the user is valid
passport.use(
  new JWTstrategy(
    {
      secretOrKey: CONFIG.jwt_secret,
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (err) {
        done(err);
      }
    }
  )
);
