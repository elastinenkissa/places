const express = require("express");

const router = express.Router();

const DUMMY_USERS = [
  {
    id: "u1",
    name: "John Smith",
    image:
      "https://yt3.ggpht.com/a/AATXAJxGaC16CbfsAoWB7Q_hXMrnF4FU0AZO-D1ERA=s900-c-k-c0xffffffff-no-rj-mo",
    places: 5,
  },
  {
    id: "u2",
    name: "Max Mustermann",
    image: "https://i.kym-cdn.com/photos/images/newsfeed/002/378/234/23a.png",
    places: 1,
  },
];

router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  const user = DUMMY_USERS.find((user) => {
    return (user.id = id);
  });
  res.json({ user });
});

module.exports = router;
