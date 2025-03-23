const express = require("express");
const app = express();

const mongodb = require("./data/database");

const port = process.env.PORT || 3000;

app.use("/", require("./routes"));

mongodb.initDb((err) => {
    if (err) {
        console.log("Database connection failed:", err);
    } else {
        app.listen(port, () => {
            console.log(`Database connected! Node running on port ${port}`);
        });
    }
});
