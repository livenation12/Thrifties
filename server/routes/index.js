const express = require('express')

const adminRoutes = require('./adminRoutes')
const userRoutes = require('./userRoutes')
const categoryRoutes = require('./categoryRoutes')
const conditionRoutes = require('./conditionRoutes')
const productRoutes = require('./productRoutes')

const router = express.Router()

router.use('/admins', adminRoutes)
router.use('/users', userRoutes)
router.use('/categories', categoryRoutes)
router.use('/conditions', conditionRoutes)
router.use('/products', productRoutes)


module.exports = router