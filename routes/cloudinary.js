// backend/routes/cloudinary.js
const express = require('express');
const multer = require('multer');
const streamifier = require('streamifier');
const cloudinary = require('cloudinary').v2;

const router = express.Router();
const upload = multer();

cloudinary.config({
  cloud_name:"dmix1720n",
  api_key: "291284748646961",
  api_secret: "cZb6pQUT3f79ZfKstZk-PqYpf9c",
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
