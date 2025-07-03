const fs = require("fs");
const pdfParse = require("pdf-parse");
const Tesseract = require("tesseract.js");

const extractText = async (path, mimetype) => {
  if (mimetype.includes("pdf")) {
    const dataBuffer = fs.readFileSync(path);
    const pdf = await pdfParse(dataBuffer);
    return pdf.text;
  } else if (mimetype.includes("image")) {
    const result = await Tesseract.recognize(path, "eng");
    return result.data.text;
  } else if (mimetype.includes("text")) {
    return fs.readFileSync(path, "utf-8");
  } else {
    throw new Error("Unsupported file type");
  }
};

module.exports = extractText;