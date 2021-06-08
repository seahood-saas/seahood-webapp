"use strict";
exports.__esModule = true;
var googleOauth2_1 = require("./googleOauth2");
var passport = require("passport");
//let GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var GoogleStrategy = require("passport-google-oauth20-with-people-api").Strategy;
// Creates a Passport configuration for Google
var GooglePassport = /** @class */ (function () {
    function GooglePassport() {
        var _this = this;
        this.userProfile = {};
        this.clientId = googleOauth2_1["default"].id;
        this.secretId = googleOauth2_1["default"].secret;
        passport.use(new GoogleStrategy({
            clientID: this.clientId,
            clientSecret: this.secretId,
            callbackURL: "/auth/google/callback"
        }, function (accessToken, refreshToken, profile, done) {
            console.log("inside new password google strategy");
            process.nextTick(function () {
                console.log("validating google profile:" + JSON.stringify(profile));
                console.log("userId:" + profile.id);
                console.log("displayName: " + profile.displayName);
                console.log("retrieve all of the profile info needed");
                console.log("email: " + profile.emails[0].value);
                _this.userProfile = {
                    ssoId: profile.id,
                    name: profile.displayName,
                    email: profile.emails[0].value
                };
                return done(null, profile);
            });
        }));
        passport.serializeUser(function (user, done) {
            done(null, user);
        });
        passport.deserializeUser(function (user, done) {
            done(null, user);
        });
    }
    GooglePassport.prototype.getProfile = function () {
        return this.userProfile;
    };
    return GooglePassport;
}());
exports["default"] = GooglePassport;
