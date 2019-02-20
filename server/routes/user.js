const express = require('express')
const router = express.Router()

const userController = require('../controllers/user')

router.get('/test', userController.test)

router.post('/auth', userController.userAuth)
module.exports = router