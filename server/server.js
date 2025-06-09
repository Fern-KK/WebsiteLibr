const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000
const fs = require('fs')

// Json and cors

app.use(cors())
app.use(express.json())

// Get movies and series

app.get('/books', (req, res) => {
    fs.readFile('./server/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file: ', err)
            res.status(500).send('Error reading file')
            return
        }
        try {
            const jsonData = JSON.parse(data)
            res.setHeader('Content-Type', 'application/json')
            res.status(200).json(jsonData)
        }
        catch {
            console.error('Error parsing json')
            res.status(500).send('Error parsing json')
        }
    })
})

// Start the server and listen on port

app.listen(port, () => {
console.log(`API is listening on port ${port}`)
})



