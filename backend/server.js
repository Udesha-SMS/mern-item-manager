require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const itemRoutes = require("./src/routes/itemRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.CLIENT_URL
    ? process.env.CLIENT_URL.split(",").map((url) => url.trim())
    : true
}));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Item Manager API is running" });
});

app.use("/api/items", itemRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

async function startServer() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is missing. Add it to backend/.env");
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Startup error:", error.message);
    process.exit(1);
  }
}

startServer();
