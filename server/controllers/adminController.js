const bcrypt = require('bcrypt');
const Admin = require('../models/Admin');
const BaseController = require('./baseController');

class AdminController extends BaseController {
        constructor() {
                super(Admin);
        }

        allowedFetchedProperties(data) {
                const { name, email } = data;
                return { name, email };
        }

        async login(req, res) {
                try {
                        const { username, password } = req.body;
                        const admin = await this.getSingleByFilter(username);
                        if (!admin) {
                                return res.status(404).json({ message: 'Username does not match any credentials' });
                        }
                        const match = await bcrypt.compare(password, admin.password);
                        if (!match) {
                                return res.status(400).json({ error: 'Incorrect password' });
                        }
                        return this.sendSuccess(res, "Successfully logged in!", this.allowedFetchedProperties(admin));
                } catch (error) {
                        return this.internalError(res, error);
                }
        }

        async addAdmin(req, res) {
                try {
                        const { email } = req.body;
                        // Check if admin with the same email already exists
                        const adminDuplicate = await this.getSingleByFilter(email);
                        if (adminDuplicate) {
                                return res.status(400).json({ message: 'Email already exists!' });
                        }
                        // Create the admin
                        const create = await this.create(req, res);
                        if (create) {
                                return this.sendSuccess(res, "Admin account created!");
                        }
                } catch (error) {
                        return this.internalError(res, error);
                }
        }
}

const controller = new AdminController();

module.exports = {
        login: controller.login.bind(controller),
        addAdmin: controller.addAdmin.bind(controller)
};
