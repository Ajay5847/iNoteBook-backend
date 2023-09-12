const express = require('express')
const connectToMongo = require('./dbConnect')
const app = express()
const port = 3000

connectToMongo();
app.get('/', (req, res) => {
  res.send('Hello Ajay')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})