'use strict'

// calls mongoose
const mongoose = require('mongoose')

// will use MONGODB_URL variable in Heroku or local db
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/coffeecup'

// estabishes how mongoose handles promises
mongoose.Promise = Promise

module.exports.connect = () => mongoose.connect(MONGODB_URL)
module.exports.disconnect = () => mongoose.disconnect()