require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

// Destructure and provide default values
const { PORT = 5000, API_URL = "" } = process.env;

app.use(express.json());
app.use(cors());

// Root Route
app.get("/", (req, res) => res.send("Server is Running"));

// Fetch Users Route
app.get("/users", async (req, res) => {
  try {
    if (!API_URL) {
      return res.status(500).json({ message: "API_URL is not defined" });
    }

    const { data } = await axios.get(API_URL);

    res.status(200).json({ message: "Data Fetched", data });
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).json({ message: "An error occurred while fetching data" });
  }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
