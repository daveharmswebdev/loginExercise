'use strict'

const mongoose = require('mongoose')
const HTML5_EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

module.exports = mongoose.model('User', {
	user: {
		type: String,
		lowercase: true,
		required: true,
		match: [HTML5_EMAIL_REGEX, 'Please enter a valid email address']
	},
	pass: {
		type: String,
		required: true
	}
})