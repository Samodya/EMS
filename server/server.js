const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const fileRoutes = require("./api/Routes/fileRoutes");
const userRoutes = require("./api/Routes/userRoutes");
const deparmentRoutes = require("./api/Routes/departmentRoutes");
const designationRoutes = require("./api/Routes/designationRoutes");

// Connect to MongoDB
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => console.log("DB connection error", err));

const app = express();

// Middleware for CORS and parsing JSON
app.use(cors());
app.use(express.json());

// Serve static files from the 'files/uploads' directory
app.use("/files/uploads", express.static("files/uploads"));

// Use routes for file operations
app.use("/api/files", fileRoutes);
app.use("/api/users", userRoutes);
app.use("/api/department", deparmentRoutes);
app.use("/api/designation", designationRoutes);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
