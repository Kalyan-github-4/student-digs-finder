const express = require('express');
const bodyparser = require('body-parser');
const propertyRoutes = require('./routes/propertyRoutes');
const cors = require('cors');
const app = express();
const path = require("path");

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
app.use("/api/properties", propertyRoutes)


// app.use(express.static(path.join(__dirname, "client/build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "client/build", "index.html"));
// });

//Error
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({error: "Something went wrong!"});
});


module.exports = app;