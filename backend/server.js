const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/constructions", require("./routes/construction"));

app.get("/", (req, res) => {
  res.json({ message: "ConstructionConnect API is running!" });
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)

  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(process.env.PORT || 5000, () => {
      console.log(`✅ Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => {
    console.log("❌ MongoDB connection error:", err);
  });
