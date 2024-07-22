const Category = require('../models/Category')
const BaseController = require('./baseController')

class CategoryController extends BaseController {
        constructor() {
                super(Category)
        }
        async add(req, res) {
                try {
                        const { category } = req.body
                        const hasDuplicate = await this.getSingleByFilter({ category })
                        if (hasDuplicate) {
                                return res.status(400).json({ message: 'Category already exist' })
                        }
                        return this.create(req, res)
                } catch (error) {
                        return res.status(500).json({ message: "Server Error", error: error.message })
                }
        }
}
const controller = new CategoryController()

module.exports = {
        list: controller.getAll.bind(controller),
        addCategory: controller.add.bind(controller),
        deleteCategory: controller.delete.bind(controller),
        updateCategory: controller.update.bind(controller)
}


