const express = require("express");

const router = express.Router();

const { getPlaceById, getPlacesByUser, createPlace } = require("../controllers/places-controller")

router.get("/:id", getPlaceById);

router.get("/user/:uid", getPlacesByUser);

router.post("/", createPlace)

module.exports = router;
