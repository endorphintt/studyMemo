require('dotenv').config()
const express = require('express')
const cors = require('cors')
const PORT = process.env.PORT || 4040
const app = express()
const addImages = require('./addImages')
const EventRoutes = require('./routes/EventRoutes')
const ImageRoutes = require('./routes/ImageRoutes')
const path = require('path')
const deleteAllImages = require('./deleteAllImages')

app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))

app.use('/events', EventRoutes)
app.use('/images', ImageRoutes)

// addImages()
// deleteAllImages()

app.listen(PORT, () => console.log(`Server are working on ${PORT}`))