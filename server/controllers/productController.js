const { default: mongoose } = require('mongoose');
const Product = require('../models/Product')
const BaseController = require('./baseController')

class ProductController extends BaseController {
        constructor() {
                super(Product)
        }
        // This method is used to add a product to the database. It takes a request object and a response object as parameters.
        // The request object contains the files uploaded and the product data.
        // The response object is used to send the response back to the client.
        async addProduct(req, res) {
                try {
                        // Get the files and products from the request object
                        const files = req.files;
                        const products = req.body.products;

                        // Check if there are any files uploaded or any product data provided
                        if (!files || files.length === 0) {
                                // If there are no files uploaded, send a 400 status code with a JSON message indicating that no files were uploaded
                                return res.status(400).json({ message: 'No files uploaded' });
                        }

                        if (!products || products.length === 0) {
                                // If there is no product data provided, send a 400 status code with a JSON message indicating that no product data was provided
                                return res.status(400).json({ message: 'No product data provided' });
                        }

                        // Parse the product data if it is not already an array of objects
                        const parsedProducts = Array.isArray(products)
                                ? products.map(product => JSON.parse(product))
                                : [JSON.parse(products)]; // Handle case where there's only one product

                        // Create a promise for each product to be saved in the database
                        const productPromises = parsedProducts.map((product, index) => {
                                const newProduct = new this.model({
                                        title: product.title, // Set the title of the product
                                        category: product.category, // Set the category of the product
                                        condition: product.condition, // Set the condition of the product
                                        intendedFor: product.gender, // Set the intended for of the product
                                        brand: product.brand, // Set the brand of the product
                                        materialUsed: product.materialUsed, // Set the material used of the product
                                        issue: product.issue, // Set the issue of the product
                                        size: product.size, // Set the size of the product
                                        price: product.price, // Set the price of the product
                                        file: {
                                                fieldName: files[index].fieldname, // Set the field name of the file
                                                originalName: files[index].originalname, // Set the original name of the file
                                                encoding: files[index].encoding, // Set the encoding of the file
                                                mimeType: files[index].mimetype, // Set the mime type of the file
                                                destination: files[index].destination, // Set the destination of the file
                                                filename: files[index].filename, // Set the filename of the file
                                                path: files[index].path, // Set the path of the file
                                                size: files[index].size // Set the size of the file
                                        }
                                });
                                return newProduct.save();
                        });
                        // Save all the products to the database and send the response back to the client
                        const addedProducts = await Promise.all(productPromises);
                        res.status(200).json(addedProducts);
                } catch (error) {
                        // If an error occurs, log the error and send a 500 status code with a JSON message indicating that an error occurred
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

                        return res.status(200).json({data: result});
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