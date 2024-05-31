const express = require('express')

const {
        list,
        addCategory,
        deleteCategory,
        updateCategory
} = require('../controllers/categoryController')
const { capitalizeProps } = require('../middlewares/formatRequests')

const router = express.Router()

router.get('/', list)

router.post('/', capitalizeProps(['category']), addCategory)

router.patch('/:id', updateCategory)

router.delete('/:id', deleteCategory)

module.exports = router