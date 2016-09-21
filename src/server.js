'use strict'

const express = require('express')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const routes = require('./routes')
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000
const { connect } = require('../db/database')

const app = express()
// pug
app.set('view engine', 'pug')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))
app.use.body = {}

app.use(session({
	store: new RedisStore({
		url: process.env.REDIS_URL || 'redis://localhost:6379'
	}),
	secret: 'haveacupofcoffee'
}))

app.use((req, res, next) => {
	app.locals.user = req.session.user
	console.log(app.locals.user)
	next()
})

app.use(routes)


connect()
	.then(() => {
		app.listen(port, () => {
			console.log('now listening on port', port)
		})
	})