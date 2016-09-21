'use strict'

const { Router } = require('express')
const router = Router()
const bcrypt = require('bcrypt')

// models
const User = require('../models/user')

// home
router.get('/', (req, res) => {
	// console.log('session', session)
	res.render('home')
})

// register
router.get('/register', (req, res) => {
	res.render('register')
})

router.post('/register', ({body: {user, pass, confirmation}}, res) => {
	if ( pass === confirmation ) {
		User
			.findOne({user})
			.then( user => {
				if (user) {
					res.render('register', { error: 'already have that email signed up'})
				} else {
					return new Promise((resolve, reject) => {
						bcrypt.hash(pass, 10, (err,hash) => {
							if (err) {
								reject(err)
							} else {
								resolve(hash)
							}
						})
					})
				}
			})
			.then( hash => User.create({ user, pass: hash}))
			.then(() => res.redirect('/'))
	} else {
		res.render('register', { error: 'Password and confirmation password do not match.'})
	}
})

// login
router.get('/login', (req, res) => {
	res.render('login')
})

router.post('/login', ({ session, body: {user, pass}}, res, next) => {
	User
		.findOne({user})
		.then( user => {
			if (user) {
				return new Promise((resolve, reject) => {
					bcrypt.compare(pass, user.pass, (err, matches) => {
						if (err) {
							reject(err)
						} else {
							resolve(matches)
						}
					})
				})
			} else {
				res.render('login', { error: 'That email is not registered with a user' })
			}
		})
		.then( matches => {
			if (matches) {
				session.user = user
				res.redirect('/')
			} else {
				res.render('login', {error: 'password does not match!'})
			}
		})
		.catch( err => next(err))	
})

// logout
router.get('/logout', (req,res) => {
	res.render('logout')
})

router.post('/logout', (req,res) => {
	req.session.destroy( err => {
		if (err) throw err
		res.redirect('/login')
	})
})
module.exports = router
















