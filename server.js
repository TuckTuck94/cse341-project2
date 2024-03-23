const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongodb = require("./data/database.js");
const app = express();
const createError = require("http-errors");

const port = process.env.PORT || 8080;

const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Z-Key"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );

  next();
});

// Routes
app.use("/", require("./routes"));
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// Error handling middleware
app.use((req, res, next) => {
  next(createError(404, "Not Found"));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

// Initialize MongoDB
mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Database is listening and node is Running on port ${port}`);
    });
  }
});
