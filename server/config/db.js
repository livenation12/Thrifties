const mongoose = require('mongoose');

// Define an asynchronous function to connect to the database
const connectDB = async () => {
        try {
                // Use mongoose to connect to MongoDB using the connection string from environment variables
                await mongoose.connect(process.env.MONGO_URI + process.env.DBNAME);
                console.log('MongoDB connected'); // Log a success message if connection is successful
        } catch (error) {
                console.error('MongoDB connection failed:', error.message); // Log an error message if connection fails
                process.exit(1); // Exit the process with a failure code
        }
};

// Export the connectDB function to be used in other parts of the application
module.exports = connectDB;
