const express = require('express')
const {
        login,
        addAdmin
} = require('../controllers/adminController')
const { hashPassword } = require('../middlewares/formatRequests')

const router = express.Router()

router.post('/login', login)

router.post('/', hashPassword, addAdmin)

module.exports = router