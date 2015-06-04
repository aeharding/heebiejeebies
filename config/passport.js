/**
 * Passport configuration
 *
 * This is the configuration for your Passport.js setup and where you
 * define the authentication strategies you want your application to employ.
 *
 * I have tested the service with all of the providers listed below - if you
 * come across a provider that for some reason doesn't work, feel free to open
 * an issue on GitHub.
 *
 * Also, authentication scopes can be set through the `scope` property.
 *
 * For more information on the available providers, check out:
 * http://passportjs.org/guide/providers/
 */

module.exports.passport = {
  // local: {
  //   strategy: require('passport-local').Strategy
  // },

  // bearer: {
  //   strategy: require('passport-http-bearer').Strategy
  // },

  twitter: {
    name: 'Twitter',
    className: 'twitter',
    protocol: 'oauth',
    strategy: require('passport-twitter').Strategy,
    options: {
      consumerKey: 'EeXPiBs9r5kiDDFfmKfixe3rB',
      consumerSecret: 'ggJVtlsGHBq1NEc2RgUhFQwm0A8uyjI0LLfye1Pn8gIzyPjo5s'
    }
  },

  // github: {
  //   name: 'GitHub',
  //   protocol: 'oauth2',
  //   strategy: require('passport-github').Strategy,
  //   options: {
  //     clientID: 'your-client-id',
  //     clientSecret: 'your-client-secret'
  //   }
  // },

  facebook: {
    name: 'Facebook',
    className: 'facebook',
    protocol: 'oauth2',
    strategy: require('passport-facebook').Strategy,
    options: {
      clientID: '1003827562963220',
      clientSecret: '5b8a0ccc024af99201456334f1167eb9',
      scope: ['email', 'public_profile'] /* email is necessary for login behavior */
    }
  },

  google: {
    name: 'Google+',
    className: 'google-plus',
    protocol: 'oauth2',
    strategy: require('passport-google-oauth').OAuth2Strategy,
    options: {
      clientID: '647442736142-o41lf5jguacr7isa77fdqoph846gvd4s.apps.googleusercontent.com',
      clientSecret: 'DavIpi-JVWuBdX5PZjNG7ACP',
      callbackURL: 'http://localhost:1337/auth/google/callback'
    },
    scope: ['https://www.googleapis.com/auth/plus.login']
  }

  // cas: {
  //   name: 'CAS',
  //   protocol: 'cas',
  //   strategy: require('passport-cas').Strategy,
  //   options: {
  //     ssoBaseURL: 'http://your-cas-url',
  //     serverBaseURL: 'http://localhost:1337',
  //     serviceURL: 'http://localhost:1337/auth/cas/callback'
  //   }
  // }
};
