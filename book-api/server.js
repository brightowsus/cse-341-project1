const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

const authorRoutes = require("./routes/authorRoutes");
const bookRoutes = require("./routes/bookRoutes");

// Middleware
app.use(express.json());

// Routes
app.use("/api/authors", authorRoutes);
app.use("/api/books", bookRoutes);

// Swagger setup (as you've done earlier)
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Book Tracker API",
      version: "1.0.0",
      description: "A simple API to track books and authors",
    },
    servers: [
      {
        url: "https://cse-341-project1-1-h0w2.onrender.com",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Connect to Mongo and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");

    app.listen(process.env.PORT || 3000, () =>
      console.log(`🚀 Server running on port ${process.env.PORT || 3000}`)
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
  });


  // Make sure the MONGO_URI is correctly referenced
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  console.error('MongoDB URI is not defined!');
  process.exit(1); // Exit the app if the MongoDB URI is not found
}