const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path')

const api = require('./routes/api')

// Using .env
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000

// Connect our database
mongoose.connect(process.env.DB, {useNewUrlParser:true, useUnifiedTopology: true})

// Allow Cross Origin
app.use((req ,res, next) => {
    res.header("Access-Control-Allow_Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next();
});

// Use Body Pharser
app.use(bodyParser.json());

// Log Errors
app.use((err, req, res, next) => {
    console.log(err)
    next()
})

app.use(express.static('client/build'))

app.use("/api", api)

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/client/build/index.html')
})

app.listen(PORT, () => {
    console.log("Server running on port: "+ PORT);
})
