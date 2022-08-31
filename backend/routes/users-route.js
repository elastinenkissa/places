const express = require("express");

const router = express.Router();

const getUserById = require("../controllers/users-controller")

router.get("/:id", getUserById);

module.exports = router;
