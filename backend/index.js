require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Server is Running");
});

app.get("/users", async (req, res) => {
  try {
    const url = process.env.API_URL;

    const response = await axios.get(url);

    // console.log(response);

    res.status(200).json({ message: "Data Fetched", data: response.data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Some Error Occured" });
  }
});

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
