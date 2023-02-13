const express = require('express')
const userRouter = require('./routes/userRoute')
require('dotenv').config()

require('./database')

const app = express()
const PORT = 9999

app.use(express.json())

app.use((req, res, next) => {
    console.log(`${req.method}:${req.url}`)
    next()
})


app.use('/api/users', userRouter)

app.listen(PORT, () => {console.log(`Server running on port ${PORT}`)})