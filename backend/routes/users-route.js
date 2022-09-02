const express = require("express");

const { check } = require("express-validator");

const router = express.Router();

const {
  getUsers,
  getUserById,
  createUser,
  loginUser,
} = require("../controllers/users-controller");

router.get("/", getUsers);

router.get("/:id", getUserById);

router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isStrongPassword({ minLength: 6 }),
  ],
  createUser
);

router.post("/login", loginUser);

module.exports = router;
