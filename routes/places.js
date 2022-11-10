const express = require('express');

const { check } = require('express-validator');

const router = express.Router();

const {
  getPlaces,
  getPlaceById,
  getPlacesByUser,
  createPlace,
  updatePlace,
  deletePlace,
} = require('../controllers/places');
const { fileUpload, getUser } = require('../util/middleware');

router.get('/', getPlaces);

router.get('/:id', getPlaceById);

router.get('/user/:uid', getPlacesByUser);

router.post(
  '/',
  getUser,
  fileUpload.single('image'),
  [
    check('title').not().isEmpty(),
    check('description').isLength({ min: 5 }),
    check('address').not().isEmpty(),
  ],
  createPlace
);

router.patch(
  '/:id',
  getUser,
  [check('title').not().isEmpty(), check('description').isLength({ min: 5 })],
  updatePlace
);

router.delete('/:id', getUser, deletePlace);

module.exports = router;
