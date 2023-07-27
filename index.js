// app.js
require("dotenv").config();
const express = require("express");
const { connectDB } = require("./connectDB.js");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
// routes
const { todos } = require("./routes/api/todos.js");

const app = express();

// Connect Database
connectDB();

// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware-body parser
// Parse incoming request bodies (you need to place this before your routes)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(process.env.PUBLIC_DIR));

app.get("/", (req, res) => res.send("Hello world!"));

// use Routes
// ex http://localhost:8080/api/todos  on this url add routes of todos
app.use("/api/todos", todos);
app.use("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

app.listen(process.env.PORT, () => console.log(`Server running `));
