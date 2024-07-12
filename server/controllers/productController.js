const { default: mongoose } = require('mongoose');
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
                        const addedProducts = await Promise.all(productPromises);
                        res.status(200).json(addedProducts);
                } catch (error) {
                        console.error(error);
                        res.status(500).json({ error: 'An error occurred' });
                }
        }

        async updateMultipleStatusById(req, res) {
                const { updateIds, status } = req.body;

                if (!Array.isArray(updateIds)) {
                        return res.status(400).json({ message: "Id payload must be an array" });
                }

                // Validate that all provided IDs are valid ObjectIDs
                for (let id of updateIds) {
                        if (!mongoose.Types.ObjectId.isValid(id)) {
                                return res.status(400).json({ message: `Invalid ObjectId: ${id}` });
                        }
                }

                try {
                        // Convert updateIds to ObjectId type using new
                        const objectIdArray = updateIds.map(id => new mongoose.Types.ObjectId(id));

                        // Find documents with _id in the objectIdArray
                        const products = await Product.find({ _id: { $in: objectIdArray } });

                        // Check if any products were found
                        if (products.length === 0) {
                                return res.status(404).json({ message: "No products found with the provided IDs" });
                        }

                        // Update the status of the found products
                        const result = await Product.updateMany(
                                { _id: { $in: objectIdArray } },
                                { $set: { status: status } }
                        );

                        return res.status(200).json(result);
                } catch (error) {
                        console.error("Error updating product status:", error);
                        return res.status(500).json({ message: "Server Error", error: error.message });
                }
        }
}

const controller = new ProductController()

module.exports = {
        add: controller.addProduct.bind(controller),
        getProducts: controller.getAll.bind(controller),
        updateProduct: controller.update.bind(controller),
        filter: controller.getAllByFilter.bind(controller),
        single: controller.getById.bind(controller),
        updateMultipleStatusById: controller.updateMultipleStatusById.bind(controller)
}