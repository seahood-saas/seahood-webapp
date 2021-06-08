import googleAppAuth from "./googleOauth2";

let passport = require("passport");
//let GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
let GoogleStrategy =
  require("passport-google-oauth20-with-people-api").Strategy;

// Creates a Passport configuration for Google
class GooglePassport {
  clientId: string;
  secretId: string;
  userProfile: any = {};

  constructor() {
    this.clientId = googleAppAuth.id;
    this.secretId = googleAppAuth.secret;

    passport.use(
      new GoogleStrategy(
        {
          clientID: this.clientId,
          clientSecret: this.secretId,
          callbackURL: "/auth/google/callback",
        },
        (accessToken, refreshToken, profile, done) => {
          console.log("inside new password google strategy");
          process.nextTick(() => {
            console.log("validating google profile:" + JSON.stringify(profile));
            console.log("userId:" + profile.id);
            console.log("displayName: " + profile.displayName);
            console.log("retrieve all of the profile info needed");
            console.log("email: " + profile.emails[0].value);
            this.userProfile = {
              ssoId: profile.id,
              name: profile.displayName,
              email: profile.emails[0].value,
            };
            return done(null, profile);
          });
        }
      )
    );

    passport.serializeUser(function (user, done) {
      done(null, user);
    });

    passport.deserializeUser(function (user, done) {
      done(null, user);
    });
  }
  getProfile() {
    return this.userProfile;
  }
}
export default GooglePassport;
