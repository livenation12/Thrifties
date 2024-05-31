const express = require('express')
const { uploadProductFiles } = require('../middlewares/productMiddleware')

const router = express.Router()


router.post('/',
        uploadProductFiles,
)

module.exports = router