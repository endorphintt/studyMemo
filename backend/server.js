require('dotenv').config()
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const addImagesToDatabase = require('./addImages/addImages')
const deleteAllImages = require('./addImages/delete')
const cors = require('cors')

app.use(cors());

// Database connection (using sequelize)

const sequelize = require('./config/database'); // Path to the database connection configuration file
sequelize.sync().then(() => {
    console.log('Database synced');
}).catch(error => {
    console.error('Database sync error:', error);
});; // Synchronize models with the database

// Routes for working with items and images
const eventRoutes = require('./routes/eventRoutes'); // Path to the file with routes for items
const imageRoutes = require('./routes/imageRoutes'); // Path to the file with routes for images

app.use('/events', eventRoutes); // Use routes for items
app.use('/images', imageRoutes); // Use routes for images

// deleteAllImages()
// addImagesToDatabase()

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});