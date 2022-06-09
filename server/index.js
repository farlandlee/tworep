const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')

const db = require('./db')
const routes = require('./routes')
const { Console } = require('console')
const app = express()
const apiPort = 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use(express.static(path.join(__dirname, 'build')))

app.get('/', (req, res) => {
    res.send('Connected!')
})

app.use('/', routes)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))