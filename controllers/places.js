const { validationResult } = require('express-validator');

const fs = require('fs');
const HttpError = require('../models/error');
const Place = require('../models/place');
const User = require('../models/user');
const mongoose = require('mongoose');

const getPlaces = async (req, res, next) => {
  const places = await Place.find({}).populate('poster', '-places');

  if (!places || places.length === 0) {
    return next(new HttpError('Could not find places.', 404));
  }

  res.status(200).json(places);
};

const getPlaceById = async (req, res, next) => {
  const id = req.params.id;
  const place = await Place.findById(id).populate('poster', '-places');

  if (!place) {
    return next(new HttpError('Could not find a place with that ID.', 404));
  }

  res.status(200).json(place);
};

const getPlacesByUser = async (req, res, next) => {
  const uid = req.params.uid;

  const places = await Place.find({ poster: uid }).populate(
    'poster',
    '-places'
  );

  res.status(200).json(places);
};

const createPlace = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.error(errors);
    return next(new HttpError('Invalid data.', 422));
  }

  const user = req.user

  if (!user) {
    return next(new HttpError('Could not find user.', 404));
  }

  const newPlace = new Place({
    title: req.body.title,
    description: req.body.description,
    address: req.body.address,
    image: req.file.path,
    poster: user.id,
  });

  const session = await mongoose.startSession();
  session.startTransaction();
  await newPlace.save({ session });
  user.places.push(newPlace);
  await user.save({ session });
  await session.commitTransaction();
  await session.endSession();

  res.status(201).json(newPlace);
};

const updatePlace = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.error(errors);
    return next(new HttpError('Invalid data.', 422));
  }

  const placeId = req.params.id;

  const place = await Place.findById(placeId);

  place.title = req.body.title;
  place.description = req.body.description;

  const updatingPlace = await place.save();

  res.status(202).json(updatingPlace);
};

const deletePlace = async (req, res, next) => {
  const placeId = req.params.id;

  const deletingPlace = await Place.findById(placeId).populate('poster');

  const title = deletingPlace.title;

  const imagePath = deletingPlace.image;

  const session = await mongoose.startSession();
  session.startTransaction();
  deletingPlace.poster.places.pull(deletingPlace);
  await deletingPlace.poster.save({ session });
  await deletingPlace.remove({ session });
  await session.commitTransaction();
  await session.endSession();

  if (!deletingPlace) {
    return next(new HttpError('Place already removed.', 404));
  }

  fs.unlink(imagePath, (err) => {
    console.log(err);
  });

  res.status(202).json({ message: `Place ${title} deleted` });
};

module.exports = {
  getPlaces,
  getPlaceById,
  getPlacesByUser,
  createPlace,
  updatePlace,
  deletePlace,
};
