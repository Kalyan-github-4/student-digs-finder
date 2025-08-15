const express = require('express');
const bodyparser = require('body-parser');
const propertyController = require('./controllers/propertyController');
const cors = require('cors');
const app = express();

app.use(cors({
  origin: 'http://localhost:8080', 
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

//Middleware
app.use(bodyparser.json({limit: '20mb'})); // Increased limit for large property data
app.use(bodyparser.urlencoded({ limit: '20mb',extended: true}));

//Routes
app.post("/api/properties", propertyController.createProperty);

//Error
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({error: "Something went wrong!"});
});


module.exports = app;