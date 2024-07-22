const Condition = require('../models/Condition')
const BaseController = require('./baseController')

class ConditionController extends BaseController {
        constructor() {
                super(Condition)
        }
        async add(req, res) {
                try {
                        const { condition } = req.body
                        const hasDuplicate = await this.getSingleByFilter({ condition })
                        if (hasDuplicate) {
                                return res.status(400).json({ message: 'Condition already exist' })
                        }
                        return this.create(req, res)
                } catch (error) {
                        return res.status(500).json({ message: "Server Error", error: error.message })

                }
        }
}
const controller = new ConditionController()

module.exports = {
        list: controller.getAll.bind(controller),
        addCondition: controller.add.bind(controller),
        deleteCondition: controller.delete.bind(controller),
        updateCondition: controller.update.bind(controller)
}


