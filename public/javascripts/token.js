var jwt = require('jsonwebtoken');
var dotenv = require('dotenv');

dotenv.config();

// create token
var token = jwt.sign({ name: 'minsukim', location: 'seoul' }, process.env.SECRET_KEY);

console.log(token);