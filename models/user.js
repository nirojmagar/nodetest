const mongoose = require('mongoose');
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

// Create a model put singular name
const user = mongoose.model('user', userSchema);

// Export the model
module.exports = user;