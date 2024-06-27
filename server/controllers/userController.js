
const User = require('../models/User')
const BaseController = require('./baseController')

class UserController extends BaseController {
        constructor() {
                super(User)
        }
        async signup(req, res) {
                try {
                        const { password, cpassword, username } = req.body
                        if (password !== cpassword) {
                                return res.status(400).json({ error: 'Passwords do not match' })
                        }
                        const duplicate = await User.findOne({ username })
                        if (duplicate) {
                                return res.status(400).json({ error: 'Username is already in use' })
                        }
                        const hashPassword = await bcrypt.hash(password, saltRounds)
                        if (!hashPassword) {
                                return res.status(400).json({ error: 'Error on hashing your password' })
                        }
                        await this.model.create({ username, password: hashPassword })
                        return res.status(200).json({ message: "Successfully created your account!" })
                } catch (error) {
                        return this.internalError(res, error)
                }
        }

        async login(req, res) {
                try {
                        const { username, password } = req.body
                        const user = await this.getSingleByFilter(username)
                        if (!user) {
                                return res.status(400).json({ error: 'Username does not have match any credentials' })
                        }
                        const match = await bcrypt.compare(password, user.password)
                        if (!match) {
                                return res.status(400).json({ error: 'Incorrect password' })
                        }
                        return res.status(200).json({ data: user.username, message: "Successfully login!" })
                } catch (error) {
                        return this.internalError(res, error)
                }
        }
}
const controller = new UserController()

module.exports = {
        login: controller.login.bind(controller),
        signup: controller.signup.bind(controller)
}