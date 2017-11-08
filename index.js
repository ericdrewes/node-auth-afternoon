const express = require('express');
const session = require('express-session');
const passport = require('passport');
const strategy = require('./strategy');

const app = express();
app.use(
	session({
		secret: '@nyth!ng y0u w@nT',
		resave: false,
		saveUninitialized: false
	})
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(strategy);

passport.serializeUser((user, done) => {
	const { _json } = user;
	done(null, {
		clientID: _json.clientID,
		email: _json.email,
		name: _json.name,
		followers_url: _json.followers_url
	});
});

passport.deserializeUser((obj, done) => {
	done(null, obj);
});

const port = 3000;
app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
