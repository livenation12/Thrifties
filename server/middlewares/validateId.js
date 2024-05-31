const { Types: { ObjectId } } = require("mongoose");

const validateId = (req, res, next) => {
        const { id } = req.params;
        if (id && ObjectId.isValid(id)) {
                return next();
        }
        return res.status(400).json({ message: "Invalid ID" });
};

module.exports = validateId;
