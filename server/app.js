const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const app = express();


mongoose.Promise = global.Promise;
if( process.env.MODE_ENV === 'test' ){
	mongoose.connect('mongodb://localhost/APIAuthenticationTEST');
} else {
	mongoose.connect('mongodb://localhost/APIAuthentication');
	app.use(morgan('dev'));
}


app.use(bodyParser.urlencoded({ extended: false }))



app.use('/users', require('./routes/users'));

module.exports = app;