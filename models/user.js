const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const schema = mongoose.Schema;


// Create a schema
const userSchema = new schema({
	email: {
		type: String,
		require: true,
		unique: true,
		lowercase: true
	},
	password: {
		type: String,
		require: true
	}
});


// implement bcrypt 
userSchema.pre('save', async function(next) {
	console.log('userSchema.pre:: implement bcrypt');
	try {
		// Generate a salt
		const salt = await bcrypt.genSalt(10);
		// Generate a password has ( salt + hash )
		// const passwordHash = await bcrypt.hash(this.password, salt);
		this.password = await bcrypt.hash(this.password, salt);//passwordHash;
		// console.log('salt', salt);
		// console.log('normal password', this.password);
		// console.log('hashed password', passwordHash);
		next();
	} catch( error ) {
		next(error);
	}
});


userSchema.methods.isValidPassword = async function(newPassword) {
	console.log('userSchema.methods.isValidPassword');
	try {
		const result =  await bcrypt.compare(newPassword, this.password);
		console.log('compared result = ',result);
		return result;
	} catch( error ) {
		throw new Error(error);
	}
}

// Create a model put singular name
const user = mongoose.model('user', userSchema);

// Export the model
module.exports = user;