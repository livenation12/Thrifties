const multer = require('multer')
const fs = require('fs')
const path = require('path')

const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif']

const storage = multer.diskStorage({
        destination: (req, file, callback) => {
                const { category } = req.body
                const destination = `public/images/products/${category}`
                const directory = path.resolve(destination)
                if (!fs.existsSync(directory)) {
                        fs.mkdirSync(directory, { recursive: true })
                }
                callback(null, destination)
        },
        filename: (req, file, callback) => {
                const fileName = `${Date.now()}_${file.originalname}`;
                callback(null, fileName)
        }
})

const fileFilter = (req, file, callback) => {
        const extension = path.extname(file.originalname).toLowerCase()
        if (allowedExtensions.includes(extension)) {
                callback(null, true)
        } else {
                callback(new Error(`Invalid file type. Only ${allowedExtensions.join(', ')} files are allowed.`), false)
        }
}

const upload = multer({
        storage,
        fileFilter
})

const uploadProductFiles = upload.array('files')

module.exports = {
        uploadProductFiles
}