const Joi = require('joi');

module.exports = {
	validateBody: (schema) => {
		console.log('validateBody called');
		return (req, res, next) => {
			console.log(req.value, req.body);
			const result = Joi.validate(req.body, schema);
			if( result.error ){
				return res.status(400).json(result.error);
			}


			if( !req.value ){ req.value = {}; }
			req.value['body'] = result.value;
			next();
		}
	},

	schemas: {
		authSchema: Joi.object().keys({
			email: Joi.string().email().required(),
			password: Joi.string().required()
		})
	}
}