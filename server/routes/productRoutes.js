const express = require('express')
const { uploadProductFiles } = require('../middlewares/productUpload')
const { add, getProducts, updateProduct, filter } = require('../controllers/productController')

const router = express.Router()


router.post('/', uploadProductFiles, add)

router.get('/', getProducts)

router.patch('/:id', updateProduct)

router.post('/filter', filter)

module.exports = router