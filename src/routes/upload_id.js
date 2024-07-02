// src/routes/upload_id.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const router = express.Router();

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const id = req.body.id;
    const extension = '.webp';
    cb(null, `${id}${extension}`);
  }
});

const upload = multer({ storage: storage });

const verifyID = (req, res, next) => {
  console.log('Verificando ID:', req.body.id);
  if (!req.body.id) {
    return res.status(400).send({ message: 'Please provide an ID' });
  }
  next();
};

router.post('/', upload.single('image'), verifyID, async (req, res) => {
  console.log('Archivo recibido:', req.file);
  if (!req.file) {
    return res.status(400).send({ message: 'Please upload an image' });
  }

  const id = req.body.id;
  const filename = `${id}.webp`;
  const filePath = path.join(__dirname, '../../uploads', filename);

  try {
    await sharp(req.file.path)
      .webp({ quality: 80 })
      .toFile(filePath);
    fs.unlinkSync(req.file.path);
  } catch (error) {
    console.error('Error al convertir la imagen:', error);
    return res.status(500).send({ message: 'Error al procesar la imagen' });
  }

  const imageUrl = `https://cdn-user-image.historiallaboral.com/uploads/${filename}`;
  res.send({
    imageUrl: imageUrl,
    filename: filename
  });
});

module.exports = router;
