# [Heebie Jeebies card creator](http://www.yourheebiejeebies.com)

![image](https://cloud.githubusercontent.com/assets/2166114/8338734/5e8abcd6-1a78-11e5-8272-3a9593936f22.png)

This is a [Sails](http://sailsjs.org) application with a Mongo database. You can login with Twitter, Facebook, or Google Plus. Once logged in, you can create 'cards' with unique URLs that you can share with anyone. You can also print your card(s) to add to your existing Heebie Jeebies card game.

## TODO
 1. Allow cards to be part of collections. People can then share collections of cards.
 2. Clean up 'right click to not print' a specific card.
 3. Local login (?)
 4. Redis session storage (currently disk-based on Mongo)
 5. Docker deployment -- need to figure out db backups

## Deployment

This web application is designed to be deployed on Heroku. Make sure that you have Mongolab set up so that Sails can connect to it.

### Third part login providers

For the various login providers, you must login to their developer consoles and get the keys to add to the environment variables specified below. You must also list valid callback URLs for the provider.

### Environment variables

Must be configured properly

 * `HOST_URL`: e.g. `http://localhost:1337`, for the Google oauth callback
 * `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET`
 * `FACEBOOK_CLIENT_ID` & `FACEBOOK_CLIENT_SECRET`
 * `TWITTER_CONSUMER_KEY` & `TWITTER_CONSUMER_SECRET`
 * `PORT` - port to run http server on. Default is '1337'
 * `NODE_ENV` - default 'production'
 * `CARD_URL` - obfuscate the csv card download
 * `GOOGLE_MAPS_PUBLIC_API_SERVER_KEY` - Google public maps API server key. Used for the user settings location autosuggest
