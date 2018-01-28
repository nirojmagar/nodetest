const express = require('express');
const router = require('express-promise-router')();
// const router = express.Router;

const { validateBody, schemas } = require('../helpers/routeHelpers');
const UsersController = require('../controllers/users');


router.route('/signUp')
.post(validateBody(schemas.authSchema), UsersController.signUp);

router.route('/signIn')
.post(UsersController.signIn);

router.route('/secret')
.get(UsersController.secret);

module.exports = router;