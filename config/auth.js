// config/auth.js

module.exports = {

    'facebookAuth' : {
        'clientID'        : '699398166896313',
        'clientSecret'    : 'a74ccf862fe4adf5bd9f84cb8d0f5c5a',
        'callbackURL'     : 'localhost:8000/auth/facebook/callback',
        'profileURL': 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email'

    },
    'googleAuth' : {
        'clientID'         : '221641113575-s90u8uugp84k23mec5db9gah9hhgvdd8.apps.googleusercontent.com',
        'clientSecret'     : 'kakdtj8VNh7zj1krYXzp0OfN',
        'callbackURL'      : 'localhost:8000/auth/google/callback'
    }

};
