const mongoose = require('mongoose')
const express = require('express')

const app = express()
const PORT = 8000

mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost:27017/frater', { useNewUrlParser: true })
.then(() => app.listen(PORT, () => console.log('Server is running on http://localhost:3800')))
.catch(err => console.log(err))