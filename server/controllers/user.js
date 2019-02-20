const User = require('../models/user')

exports.test = (req, res) => {
  res.send('Greetings from the Test controller!')
}

exports.userAuth = (req, res) => {
  const { email, password } = req.body
  User.findOne({ email, password })
  .then(user => res.send(user))
}