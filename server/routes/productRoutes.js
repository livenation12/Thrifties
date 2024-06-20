const express = require('express')
const { uploadProductFiles } = require('../middlewares/productUpload')
const { add, getProducts } = require('../controllers/productController')

const router = express.Router()


router.post('/', uploadProductFiles, add)

router.get('/', getProducts)

module.exports = router