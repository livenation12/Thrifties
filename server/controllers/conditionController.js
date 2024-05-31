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
        addCategory: controller.create.bind(controller),
        deleteCategory: controller.delete.bind(controller),
        updateCategory: controller.update.bind(controller)
}


