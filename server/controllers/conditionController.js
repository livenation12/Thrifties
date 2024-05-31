const Condition = require('../models/Condition')
const BaseController = require('./baseController')

class ConditionController extends BaseController {
        constructor() {
                super(Condition)
        }
}
const controller = new ConditionController()

module.exports = {
        list: controller.getAll.bind(controller),
        addCondition: controller.create.bind(controller),
        deleteCondition: controller.delete.bind(controller),
        updateCondition: controller.update.bind(controller)
}


