const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const localStrategy = require('passport-local').Strategy;
const { JWT_SECRET } = require('./configuration');
const User = require('./models/user');


// JSON WEB TOKENS STRATEGY
passport.use(new JWTStrategy({
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	secretOrKey: JWT_SECRET
}, async (payload, done) => {
	console.log('JSON WEB TOKENS STRATEGY');
	try{
		//  Find the user apecified in token
		const user = await User.FindById(payload.sub);


		// If user doesn't exists, handle it 
		if( !user ) {
			return done(null, false);
		}


		// Otherwise, return the user
		done(null, user);
	} catch( error ) {
		done(error, false);
	}
}));


// LOCAL STRATEGY
passport.use( new localStrategy({
	usernameField: 'email'
}, async (email, password, done) => {
	console.log('LOCAL STRATEGY');
	try {
		// Find user with given email
		const foundUser = await User.findOne({ email });

		// If not , handle it
		if( !foundUser ) {
			return done(null, false);
		}

		// Chaeck if the password is correct
		const isMatch = await foundUser.isValidPassword(password);

		// If not, handle it
		if( !isMatch ) {
			return done(null, false);
		}

		// Otherwise, return the user
		done(null, foundUser);
	} catch( error ) {
		console.log('error occured');
		done(error);
	}
}));