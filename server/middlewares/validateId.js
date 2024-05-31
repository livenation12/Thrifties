
const { ObjectId } = require('mongoose').Types;

const validateId = (req, res, next) => {
        const { id } = req.params;
        if (id) {
                if (ObjectId.isValid(id)) {
                        return next();
                }
                return res.status(400).json({ message: "Invalid ID" });
        }
        return next(); // If `id` is not present, proceed to the next middleware
};


module.exports = validateId;
