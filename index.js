const express = require('express');
const connectToMongo = require('./dbConnect')
const app = express();
const auth = require('./routes/auth');
const port = 3000

app.use(express.json());

connectToMongo();
app.use('/api/auth', auth);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})