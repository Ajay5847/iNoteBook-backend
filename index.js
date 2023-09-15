const express = require('express');
const connectToMongo = require('./dbConnect')
const dotenv = require('dotenv').config();
const app = express();
const auth = require('./routes/auth');
const notes = require('./routes/notes');

app.use(express.json());

connectToMongo();
app.use('/api/auth', auth);
app.use('/api/note', notes);

const MY_PORT = process.env.PORT;
app.listen(MY_PORT, () => {
  console.log(`Example app listening on port ${MY_PORT}`)
})