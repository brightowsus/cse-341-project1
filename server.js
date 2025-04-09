const express = require("express");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const mongodb = require("./data/database");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Mount all API routes under /api
app.use("/api", require("./routes"));

const port = process.env.PORT || 3000;

mongodb.initDb((err) => {
  if (err) {
    console.log("Database connection failed:", err);
  } else {
    app.listen(port, () => {
      console.log(`Database connected! Server running at http://localhost:${port}`);
    });
  }
});
