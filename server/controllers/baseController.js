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
        internalError(res, error) {
                return res.status(500).json({ message: "Server Error", error: error.message })
        }

        async getAll(req, res) {
                try {
                        const items = await this.model.find();
                        res.json(items);
                } catch (error) {
                        this.internalError(res)
                }
        }

        async getById(req, res) {
                try {
                        const id = req.params.id;
                        const item = await this.model.findById(id);
                        res.json(item);
                } catch (error) {
                        this.internalError(res)
                }
        }

        async getByProp(prop) {
                try {
                        const item = await this.model.findOne({ prop })
                        res.json(item)
                } catch (error) {
                        this.internalError(res)
                }
        }

        async create(req, res) {
                try {
                        const newItem = await this.model.create(req.body);
                        res.status(201).json(newItem);
                } catch (error) {
                        this.internalError(res)
                }
        }

        async update(req, res) {
                try {
                        const id = req.params.id;
                        const updatedItem = await this.model.findByIdAndUpdate(id, req.body, { new: true });
                        res.json(updatedItem);
                } catch (error) {
                        this.internalError(res)
                }
        }

        async delete(req, res) {
                try {
                        const id = req.params.id;
                        await this.model.findByIdAndDelete(id);
                        res.sendStatus(204);
                } catch (error) {
                        this.internalError(res)
                }
        }

}

module.exports = BaseController;
