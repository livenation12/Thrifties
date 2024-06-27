const Product = require('../models/Product')
const BaseController = require('./baseController')

class ProductController extends BaseController {
        constructor() {
                super(Product)
        }
        async addProduct(req, res) {
                try {
                        const files = req.files;
                        const products = req.body.products;

                        if (!files || files.length === 0) {
                                return res.status(400).json({ message: 'No files uploaded' });
                        }

                        if (!products || products.length === 0) {
                                return res.status(400).json({ message: 'No product data provided' });
                        }

                        const parsedProducts = Array.isArray(products)
                                ? products.map(product => JSON.parse(product))
                                : [JSON.parse(products)]; // Handle case where there's only one product

                        const productPromises = parsedProducts.map((product, index) => {
                                const newProduct = new this.model({
                                        title: product.title,
                                        category: product.category,
                                        condition: product.condition,
                                        intendedFor: product.gender,
                                        usage: product.usage,
                                        brand: product.brand,
                                        materialUsed: product.materialUsed,
                                        issue: product.issue,
                                        size: product.size,
                                        price: product.price,
                                        file: {
                                                fieldName: files[index].fieldname,
                                                originalName: files[index].originalname,
                                                encoding: files[index].encoding,
                                                mimeType: files[index].mimetype,
                                                destination: files[index].destination,
                                                filename: files[index].filename,
                                                path: files[index].path,
                                                size: files[index].size
                                        }
                                });
                                return newProduct.save();
                        });
                        await Promise.all(productPromises);
                        res.status(200).json({ message: 'Products uploaded successfully' });
                } catch (error) {
                        console.error(error);
                        res.status(500).json({ error: 'An error occurred' });
                }

        }
}

const controller = new ProductController()

module.exports = {
        add: controller.addProduct.bind(controller),
        getProducts: controller.getAll.bind(controller),
        updateProduct: controller.update.bind(controller),
        filter: controller.getAllByFilter.bind(controller)
}