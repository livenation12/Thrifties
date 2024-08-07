const User = require('../models/User');
const BaseController = require('./baseController');
const bcrypt = require('bcrypt');


class UserController extends BaseController {
        constructor() {
                super(User);
        }

       

        async signup(req, res) {
                try {
                        const { password, username } = req.body;
                        const duplicate = await User.findOne({ username });
                        if (duplicate) {
                                return res.status(400).json({ message: 'Username is already in use' });
                        }
                        const hashedPassword = await bcrypt.hash(password, 10);
                        const newUser = await this.model.create({ username, password: hashedPassword });
                        return res.status(200).json({ data: newUser.username, message: "Successfully created your account!" });
                } catch (error) {
                        return res.status(500).json({ message: "Server Error", error: error.message });
                }
        }

        async login(req, res) {
                try {
                        const { username, password } = req.body;
                        const user = await this.getSingleByFilter({ username });

                        if (!user) {
                                return res.status(400).json({ message: 'Username does not match any credentials' });
                        }

                        const match = await bcrypt.compare(password, user.password);

                        if (!match) {
                                return res.status(400).json({ message: 'Incorrect password' });
                        }


                        const token = this.createToken(user._id);
                        const data = {
                                token,
                                userId: user._id,
                                username: user.username
                        };


                        res.cookie('token', token, {
                                httpOnly: true,
                                maxAge: 1000 * 60 * 60 // 1 hour
                        });

                        return res.status(200).json({ data, message: "Successfully logged in!" });
                } catch (error) {
                        return res.status(500).json({ message: "Server Error", error: error.message });
                }
        }
}

const controller = new UserController();

module.exports = {
        login: controller.login.bind(controller),
        signup: controller.signup.bind(controller)
};
