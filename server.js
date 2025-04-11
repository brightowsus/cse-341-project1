const express = require("express");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const mongodb = require("./data/database");
const router = express.Router();  // Define the router

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Swagger docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes

app.use("/api", router);  // Use the router for /api route

const port = process.env.PORT || 3000;

mongodb.initDb((err) => {
  if (err) {
    console.log("Database connection failed:", err);
  } else {
    app.listen(port, () => {
      console.log(`Database connected! Node running on port ${port}`);
    });
  }
});
