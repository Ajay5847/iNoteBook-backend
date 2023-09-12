const mongoose = require("mongoose");
const mongoUrl = "mongodb+srv://buntyajay53:XYw2yMQROK9ZAtEJ@cluster0.5pdpeaw.mongodb.net/?retryWrites=true&w=majority"

const connectToMongo = async () => {
    mongoose.connect(mongoUrl);
    console.log("mongoDB Connected");
}

module.exports = connectToMongo;