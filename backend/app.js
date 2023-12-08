const express = require("express");
const app = express();
const PORT = 4000;
const mongoose = require("mongoose");
const cors = require("cors");
const Restaurants = require("./models/restaurantModel");
const User = require("./models/userModel");
const restaurantRouter = require("./routes/api/restaurants");
const userRouter = require("./routes/api/user");
const GeoCode = require("./routes/api/geocode");

require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    Restaurants;
    User;
    console.log("DB connected!");
  })
  .catch((err) => console.error(err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// cors
app.use(cors({ origin: true, credentials: true }));

// ROUTES
app.use("/", restaurantRouter);
app.use("/api", GeoCode);
app.use("/api/user", userRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
