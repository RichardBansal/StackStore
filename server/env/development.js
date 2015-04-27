module.exports = {
  "DATABASE_URI": "mongodb://localhost:27017/fsg-app",
  "SESSION_SECRET": "Optimus Prime is my real dad",
  "TWITTER": {
    "consumerKey": "INSERT_TWITTER_CONSUMER_KEY_HERE",
    "consumerSecret": "INSERT_TWITTER_CONSUMER_SECRET_HERE",
    "callbackUrl": "INSERT_TWITTER_CALLBACK_HERE"
  },
  "FACEBOOK": {
    "clientID": "741162282648466",
    "clientSecret": "007d47331ef7aa34c4bc557ef4de3e23",
    "callbackURL": "http://localhost:1337/auth/facebook/callback"
  },
  "GOOGLE": {
    "clientID": "247593727792-lmhmccot449j0p30ctf2jj07em3rm5ar.apps.googleusercontent.com",
    "clientSecret": "3uqHqra_2bHmILLwb_hf6fsk",
    "callbackURL": "/auth/google/callback"
  }
};