const { v4: uuidv4 } = require("uuid");

const { validationResult } = require("express-validator");

const HttpError = require("../models/error");

const DUMMY_USERS = [
  {
    id: "u1",
    name: "John Smith",
    email: "johnsmith@gmail.com",
    password: "test",
  },
  {
    id: "u2",
    name: "Max Mustermann",
    email: "maxmustermann@gmail.com",
    password: "test",
  },
];

const getUsers = (req, res, next) => {
  const users = DUMMY_USERS;
  res.json({ users });
};

const getUserById = (req, res, next) => {
  const id = req.params.id;
  const user = DUMMY_USERS.find((user) => {
    return (user.id = id);
  });

  if (!user) {
    return next(new HttpError("Could not find user with that ID.", 404));
  }

  res.status(200).json({ user });
};

const createUser = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.error(errors);
    return next(new HttpError("Invalid data.", 422));
  }

  const existingUser = DUMMY_USERS.find(
    (user) => user.email === req.body.email
  );

  if (existingUser) {
    return next(new HttpError("User already exists.", 422));
  }

  const user = {
    id: uuidv4(),
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  DUMMY_USERS.push(user);

  res.status(200).json({ user });
};

const loginUser = (req, res, next) => {
  const loggingUser = DUMMY_USERS.find((user) => user.email === req.body.email);

  if (!loggingUser || loggingUser.password !== req.body.password) {
    return next(new HttpError("Wrong credentials.", 401));
  }

  res.json({ message: "Login succesful." });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  loginUser,
};
