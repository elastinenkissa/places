const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
 
const { validationResult } = require('express-validator');

const HttpError = require('../models/error');
const User = require('../models/user');
const { JWT_SECRET } = require('../util/config');

const getUsers = async (req, res, next) => {
  const users = await User.find({}).populate('places', '-poster');

  if (!users || users.length === 0) {
    return next(new HttpError('Could not find users', 404));
  }

  res.status(200).json(users);
};

const getUserById = async (req, res, next) => {
  const id = req.params.id;

  const user = await User.findById(id).populate('places', '-poster');

  if (!user) {
    return next(new HttpError('Could not find user with that ID.', 404));
  }

  res.status(200).json(user);
};

const createUser = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid data.', 422));
  }

  const password = await bcrypt.hash(req.body.password, 10);

  const alreadyExists = await User.findOne({ email: req.body.email });
  if (alreadyExists) {
    return next(new HttpError('User already exists', 400));
  }

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    passwordHash: password,
    image: req.file.path,
  });

  await user.save();

  res.status(200).json(user);
};

const loginUser = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new HttpError('User does not exist.', 404));
  }

  const correctPassword = await bcrypt.compare(
    req.body.password,
    user.passwordHash
  );

  if (!correctPassword) {
    return next(new HttpError('Wrong credentials.', 401));
  }

  const payload = {
    id: user.id,
  };

  const token = jwt.sign(payload, JWT_SECRET);

  res
    .status(202)
    .json({
      message: 'Login succesful.',
      user: { id: user.id, name: user.name, places: user.places, token },
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  loginUser,
};
