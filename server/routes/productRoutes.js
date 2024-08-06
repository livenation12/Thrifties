const express = require('express')
const { uploadProductFiles } = require('../middlewares/productUpload')
const { add, getProducts, updateProduct, filter, single, updateMultipleStatusById, applyDiscount } = require('../controllers/productController')

const router = express.Router()


router.post('/', uploadProductFiles, add)

router.get('/', getProducts)

router.patch('/:id', updateProduct)

router.post('/filter', filter)

router.get('/:id', single)

router.put('/status', updateMultipleStatusById)

router.put('/discount', applyDiscount)


module.exports = router