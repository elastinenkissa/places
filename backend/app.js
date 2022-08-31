const express = require("express");
const bodyParser = require("body-parser");

const placesRoute = require("./routes/places-route");
const usersRoute = require("./routes/users-route");

const app = express();

app.use(bodyParser.json())

app.use("/api/places", placesRoute);

app.use("/api/users", usersRoute);

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }
  res
    .status(error.code || 500)
    .json({ message: error.message || "Unknown error occured." });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
