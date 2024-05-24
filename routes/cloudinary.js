// backend/routes/cloudinary.js
const express = require('express');
const multer = require('multer');
const streamifier = require('streamifier');
const cloudinary = require('cloudinary').v2;

const router = express.Router();
const upload = multer();
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


router.post('/upload', upload.single('file'), (req, res) => {
  let stream = cloudinary.uploader.upload_stream((error, result) => {
    if (error) {
      return res.status(500).json({ error });
    }
    res.status(200).json({ result });
  });

  streamifier.createReadStream(req.file.buffer).pipe(stream);
});

module.exports = router;
