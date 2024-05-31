const Product = require('../models/Product')


class ProductController extends BaseController {
        constructor() {
                super(Product)
        }
        async addProduct(req, res) {
                try {
                        const { category, condition } = req.body
                        const { files } = req
                        await Promise.all(
                                files.map((file) => {
                                        return Product.create({ category, file, condition })
                                })
                        )

                } catch (error) {
                        return res.status(500).json({ error: "Server error" })
                }
        }
}

const controller = new ProductController()

module.exports = {
        addProduct
}