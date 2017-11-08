const Auth0Strategy = require('passport-auth0');
const config = require('./config');

module.exports = new Auth0Strategy(
	{
		domain,
		clientID,
		clientSecret,
		callbackURL: '/login'
	},
	function(accessToken, refreshToken, extraParams, profile, done) {
		return done(null, profile);
	}
);
