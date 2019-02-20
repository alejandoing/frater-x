const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const user = require('./routes/user')
const cors = require('cors')

const app = express()
const PORT = 8000

const dev_db_url = 'mongodb://localhost:27017/frater'
const mongoDB = process.env.MONGODB_URI || dev_db_url
const db = mongoose.connection

mongoose.connect(mongoDB, { useNewUrlParser: true })
mongoose.Promise = global.Promise
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS")
  res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")
  next()
})
app.use('/users', user)

app.listen(PORT, () => console.log(`Server is up and running on port number ${PORT}`))

app.get('/', (req, res) => {
  res.send('hello world')
})