 const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(require("cors")());

// simple test route
app.get("/", (req, res) => {
  res.send("Josh AI is running 🚀");
});

// chat route
app.post("/chat", async (req, res) => {
  const message = req.body.message;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: message }]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.json(response.data.choices[0].message);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Error");
  }
});

app.listen(3000, () => console.log("Server running..."));
