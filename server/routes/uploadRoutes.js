const express = require("express");
const multer = require("multer");
const fs = require("fs");
const extractText = require("../utils/textExtractor");
const generateTasks = require("../utils/taskGenerator");
const Task = require("../models/Task");

const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, file.originalname),
});
const upload = multer({ storage });

router.post("/", upload.single("file"), async (req, res) => {
  const { path, mimetype } = req.file;
  try {
    const text = await extractText(path, mimetype);
    const tasks = await generateTasks(text);
    await Task.insertMany(tasks);
    res.json({ success: true, tasks });
  } catch (e) {
    res.status(500).json({ error: e.message });
  } finally {
    fs.unlinkSync(path);
  }
});

module.exports = router;
