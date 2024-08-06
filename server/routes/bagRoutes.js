const express = require('express')
const { addToBag, fetchUserBag, deleteFromBag } = require('../controllers/bagController')

const router = express.Router()

router.post('/', addToBag)

router.get('/:userId', fetchUserBag)

router.delete('/:id', deleteFromBag)

module.exports = router