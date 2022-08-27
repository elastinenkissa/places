const express = require("express");

const router = express.Router();

const DUMMY_PLACES = [
  {
    id: 1,
    title: "Bazinga Memorial",
    description: "Truly one of the funniest places in existence.",
    imgUrl:
      "https://img-new.cgtrader.com/items/3209261/43d23bcdb1/sheldon-cooper-the-big-bang-theory-3d-model.jpg",
    address: "Chungus Blvd 420",
    location: {
      lng: 7.4543729,
      lat: 45.3141624,
    },
    poster: "u1",
  },
  {
    id: 2,
    title: "Fourth Knight",
    description: "#1 Victory Royale.",
    imgUrl:
      "https://th.bing.com/th/id/R.a2a3c670c26f048d195c5121cbc5137b?rik=LszVjiHUGQ%2bnHQ&riu=http%3a%2f%2fwww.pwrdown.com%2fwp-content%2fuploads%2f2018%2f01%2fEvening_DurrrBurger.jpg&ehk=2r9K%2bCpHKqZTwb0CSOlrfV0w1TB5%2bERzBeesOZstsTU%3d&risl=&pid=ImgRaw&r=0",
    address: "Tomato Town 32",
    location: {
      lng: -93.8867985,
      lat: -11.8782385,
    },
    poster: "u2",
  },
];

router.get("/:id", (req, res, next) => {
  const id = +req.params.id;
  const place = DUMMY_PLACES.find((place) => {
    return place.id === id;
  });

  if (!place) {
    const error = new Error("Could not find a place with that ID.");
    error.code = 404;
    return next(error);
  }

  res.json({ place });
});

router.get("/user/:uid", (req, res, next) => {
  const uid = req.params.uid;
  const places = DUMMY_PLACES.filter((place) => {
    return place.poster === uid;
  });

  if (places.length === 0) {
    const error = new Error("Could not find a place posted by that user.");
    error.code = 404;
    return next(error);
  }
  res.json({ places });
});

module.exports = router;
