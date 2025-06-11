const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000
const fs = require('fs')
const path = require('path')

// Json and cors
app.use(cors())
app.use(express.json())


// api
app.get('/books', (req, res) => {
    fs.readFile('db.json', 'utf8', (err, data) => {
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

// sciezka do pdf
app.get('/books/:filename', (req, res) => {
    const filePath = path.join(__dirname, 'books', req.params.filename)
    
    // czy istnieje
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            res.status(404).send('File not found')
            return
        }
        
        
        res.setHeader('Content-Type', 'application/pdf')
        
        // wysyla
        res.sendFile(filePath)
    })
})

// Start serwer
app.listen(port, () => {
    console.log(`API is listening on port ${port}`)
})