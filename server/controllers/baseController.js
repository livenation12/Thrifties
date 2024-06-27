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
                        const item = await this.model.findOne({ filter })
                        res.json(item)
                } catch (error) {
                        return res.status(500).json({ message: "Server Error", error: error.message })
                }
        }

        async getAllByFilter(req, res) {
                try {
                        const item = await this.model.find({ ...req.body.filter })
                        if (item.length <= 0) {
                                return res.status(404).json({ message: "No Items Found" })
                        }
                        res.json(item)
                } catch (error) {
                        return res.status(500).json({ message: "Server Error", error: error.message })
                }
        }

        async create(req, res) {
                try {
                        const newItem = await this.model.create(req.body);
                        res.status(201).json({ data: newItem, message: "Successfully created" });
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
                        return res.json({ message: "Successfully deleted" })
                } catch (error) {
                        return res.status(500).json({ message: "Server Error", error: error.message })
                }
        }

}

module.exports = BaseController;
