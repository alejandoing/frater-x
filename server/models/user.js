const mongoose =  require('mongoose')
const Schema = mongoose.Schema

const UserSchema = Schema({
  name: String,
  email: String,
  password: String,
  privileges: String,
  status: String,
  business: Object
})

module.exports = mongoose.model('User', UserSchema)