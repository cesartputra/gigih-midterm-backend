require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const cors = require('cors')

const mongoose = require('mongoose')
const mongoString = process.env.DATABASE_URL
const database = mongoose.connection

const videoRoute = require('./routes/video.route')
const commentRoute = require('./routes/comment.route')
const authRoute = require('./routes/auth.route')
const productRoute = require('./routes/product.route')
const searchRoute = require('./routes/search.route')
const userRoute = require('./routes/user.route')

mongoose.connect(mongoString)
database.on('error', (error) => {
    console.log(error);
})
database.once('connected', () => {
    console.log('Database connected');
})

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true
    })
)

const corsOpt = {
    origin: 'http://localhost:3000'
}
app.use(cors())

app.use('/api/auth', authRoute)
app.use('/api/videos', videoRoute)
app.use('/api/comments', commentRoute)
app.use('/api/products', productRoute)
app.use('/api/search', searchRoute)
app.use('/api/users', userRoute)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))