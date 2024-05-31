const { default: mongoose } = require('mongoose')
const Category = require('../models/Category')
const BaseController = require('./baseController')

class CategoryController extends BaseController {
        constructor() {
                super(Category)
        }
}
const controller = new CategoryController()

module.exports = {
        list: controller.getAll.bind(controller),
        addCategory: controller.create.bind(controller),
        deleteCategory: controller.delete.bind(controller),
        updateCategory: controller.update.bind(controller)
}


