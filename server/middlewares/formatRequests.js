const bcrypt = require('bcrypt')

const capitalizeProps = (properties = []) => {
        return (req, res, next) => {
                properties.forEach(prop => {
                        if (req.body[prop]) {
                                req.body[prop] = req.body[prop].charAt(0).toUpperCase() + req.body[prop].slice(1);
                        }
                });
                next();
        };
};


const hashPassword = async (req, res, next) => {
        try {
                const { password, cpassword } = req.body;
                if (!password) {
                        return res.status(400).json({ message: "Password is required" });
                }
                if (password !== cpassword) {
                        return res.status(400).json({ message: "Passwords do not match" })
                }
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt)
                req.body.password = hashedPassword
                next()
        } catch (error) {
                return res.status(500).json({ message: "Hashing error", error: error.message })
        }
}

module.exports = {
        capitalizeProps,
        hashPassword
}