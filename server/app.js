const express = require('express');
const bodyparser = require('body-parser');
const propertyRoutes = require('./routes/propertyRoutes');
const cors = require('cors');
const app = express();
const path = require("path");

app.use(cors({
  origin: [
     "http://localhost:5173", 
    "http://localhost:8080",
    "https://student-digs-finder-1.onrender.com"
  ],

  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


//Middleware
app.use(bodyparser.json({limit: '20mb'})); // Increased limit for large property data
app.use(bodyparser.urlencoded({ limit: '20mb',extended: true}));

//Routes
app.use("/api/properties", propertyRoutes)


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
  });
}

//Error
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({error: "Something went wrong!"});
});


module.exports = app;