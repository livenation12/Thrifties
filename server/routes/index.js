const express = require('express')

const adminRoutes = require('./adminRoutes')
const userRoutes = require('./userRoutes')
const categoryRoutes = require('./categoryRoutes')
const conditionRoutes = require('./conditionRoutes')
const productRoutes = require('./productRoutes')
const bagRoutes = require('./bagRoutes')
const router = express.Router()

router.use('/admins', adminRoutes)
router.use('/users', userRoutes)
router.use('/categories', categoryRoutes)
router.use('/conditions', conditionRoutes)
router.use('/products', productRoutes)
router.use('/bags', bagRoutes)

module.exports = router