const express = require('express')

const {
        signup,
        login
} = require('../controllers/userController')
const { hashPassword } = require('../middlewares/formatRequests')

const router = express.Router()


router.post('/signup', hashPassword, signup)

router.post('/login', login)

module.exports = router