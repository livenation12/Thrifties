const express = require('express')

const {
        list,
        addCondition,
        updateCondition,
        deleteCondition
} = require('../controllers/conditionController')
const { capitalizeProps } = require('../middlewares/formatRequests')

const router = express.Router()

router.get('/', list)

router.post('/', capitalizeProps(['condition']), addCondition)

router.patch('/:id', updateCondition)

router.delete('/:id', deleteCondition)

module.exports = router