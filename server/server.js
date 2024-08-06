const express = require("express");
const cors = require("cors");
const path = require('path')

const { errorHandler } = require('./middlewares/errorHandler');
const logger = require("./middlewares/logger");
const cookieParser = require('cookie-parser')
const connectDB = require("./config/db");
const routes = require('./routes');
const validateId = require("./middlewares/validateId");
require('dotenv').config()


const app = express();
const env = process.env

connectDB()

// Middlewares
app.use(express.json()); // To parse JSON requests
app.use(cors({
        origin: 'http://localhost:5173', // Replace with your frontend domain
        credentials: true
})); // Apply CORS middleware
app.use(cookieParser())
// Error handling middleware
app.use(logger);
app.use(validateId)
app.use(errorHandler);

//static images
app.use('/images/products', express.static(path.join(__dirname, 'public/images/products')));
app.use(env.BASEURL, routes);


//listen to port
const PORT = env.PORT || 8000;
app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
});




