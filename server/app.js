const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const uploadRoutes = require("./routes/uploadRoutes");
const taskRoutes = require("./routes/taskRoutes");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/todo_db", { useNewUrlParser: true });

app.use("/upload", uploadRoutes);
app.use("/tasks", taskRoutes);

app.listen(5000, () => console.log("Server started on port 5000"));
