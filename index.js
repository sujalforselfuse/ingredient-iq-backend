// backend/app.js
const express = require('express');
const cors = require('cors');
const cloudinaryRoutes = require('./routes/cloudinary');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/cloudinary', cloudinaryRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
