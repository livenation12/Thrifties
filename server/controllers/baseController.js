
const jwt = require('jsonwebtoken');

class BaseController {
        constructor(model) {
                this.model = model;
        }

        sendError(res, statusCode, message) {
                return res.status(statusCode).json({ error: message });
        }
        sendSuccess(res, message, data = {}) {
                return res.status(200).json({ message, data })
        }
        async hasDuplicate(prop) {
                try {
                        const duplicate = await this.model.findOne(prop)
                        if (duplicate) {
                                return duplicate
                        }
                        return false
                } catch (error) {
                        return res.status(500).json({ message: "Server Error", error: error.message })
                }
        }
        createToken(data) {
                return jwt.sign({ data }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
        }


        async getAll(req, res) {
                try {
                        const items = await this.model.find();
                        return res.status(200).json(items);
                } catch (error) {
                        return res.status(500).json({ message: "Server Error", error: error.message })
                }
        }

        async getById(req, res) {
                try {
                        const id = req.params.id;
                        const item = await this.model.findById(id);
                        res.json(item);
                } catch (error) {
                        return res.status(500).json({ message: "Server Error", error: error.message })
                }
        }

        async getSingleByFilter(filter) {
                try {
                        return await this.model.findOne(filter)
                } catch (error) {
                        return false
                }
        }

        async getAllByFilter(req, res) {
                try {
                        const item = await this.model.find({ ...req.body.filter })
                        if (item.length <= 0) {
                                return res.json({ message: "No Items Found" })
                        }
                        res.json(item)
                } catch (error) {
                        return res.status(500).json({ message: "Server Error", error: error.message })
                }
        }

        async create(req, res) {
                try {
                        const newItem = await this.model.create(req.body);
                        res.status(201).json({ data: newItem, message: "Successfully added" });
                } catch (error) {
                        return res.status(500).json({ message: "Server Error", error: error.message })
                }
        }

        async update(req, res) {
                try {
                        const id = req.params.id;
                        const updatedItem = await this.model.findByIdAndUpdate(id, req.body, { new: true });
                        res.json({ data: updatedItem, message: "Successfully updated" });
                } catch (error) {
                        return res.status(500).json({ message: "Server Error", error: error.message })
                }
        }

        async delete(req, res) {
                try {
                        const id = req.params.id;
                        await this.model.findByIdAndDelete(id);
                        return res.json({ message: "Successfully deleted", deletedId: id })
                } catch (error) {
                        return res.status(500).json({ message: "Server Error", error: error.message })
                }
        }

}

module.exports = BaseController;
