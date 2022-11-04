const multer = require('multer');
const fs = require('fs');
const { v4: uuid } = require('uuid');

const MIME_TYPES = {
  'image/png': 'png',
  'image/jpg': 'jpg',
  'image/jpeg': 'jpeg',
};

const fileUpload = multer({
  limits: 500000,
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/images');
    },
    filename: (req, file, cb) => {
      const extension = MIME_TYPES[file.mimetype];
      cb(null, uuid() + '.' + extension);
    },
  }),
  fileFilter: (req, file, cb) => {
    const valid = !!MIME_TYPES[file.mimetype];
    let error = valid ? null : new Error('Invalid mime type');
    cb(error, valid);
  },
});

const errorHandler = (error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (error) => {
      console.log(error);
    });
  }
  if (res.headersSent) {
    return next(error);
  }
  res
    .status(error.code || 500)
    .json({ message: error.message || 'Unknown error occured.' });
};

module.exports = { errorHandler, fileUpload };
