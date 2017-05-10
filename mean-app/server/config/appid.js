
// i should have uri config some where instead of hardcode in file. to be fixed later...
// expose our config directly to our application using module.exports
module.exports = {
    'facebookAuth': {
        'clientID': '1461213957468888', // your App ID
        'clientSecret': 'your-client-secret-here', // your App Secret
        'callbackURL': 'http://localhost:5000/api/auth/facebook/callback'
    },
    'twitterAuth': {
        'consumerKey': 'your-consumer-key-here',
        'consumerSecret': 'your-client-secret-here',
        'callbackURL': 'http://localhost:5000/api/auth/twitter/callback'
    },
    'googleAuth': {
        'clientID': '539204867158-vlolikrdh2qki7oianm1ef85hshtks0f.apps.googleusercontent.com',
        'clientSecret': 'ZXwuVzOJTH9Ers5gydhOgKvI',
        'callbackURL': 'http://ubuy.asuscomm.com:5000/api/auth/google/callback'
    }
};