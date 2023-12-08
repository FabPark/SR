const express = require("express");
const axios = require("axios");
const router = express.Router();
const mongoose = require("mongoose");
const Suwon = require("../../models/restaurantModel");

const clientId = "d95j10j8u8";
const clientSecret = "pZpqzZs7siVvlR82O5XHaWKoGFoharDScFna0RQw";

router.get("/geocode/:restaurantId", async (req, res) => {
  try {
    //test
    const { restaurantId } = req.params;

    // Validate the restaurant ID format
    if (isNaN(restaurantId) || !Number.isInteger(Number(restaurantId))) {
      return res.status(400).json({ error: "Invalid restaurant ID format" });
    }

    // Fetch the restaurant data from MongoDB using the ID
    const restaurant = await Suwon.findById(restaurantId);

    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    // Get the restaurant's address
    const restaurantAddress = restaurant.address;
    //tests

    const response = await axios.get(
      "https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode",
      {
        params: {
          query: restaurantAddress,
        },
        headers: {
          "X-NCP-APIGW-API-KEY-ID": clientId,
          "X-NCP-APIGW-API-KEY": clientSecret,
        },
      }
    );

    const data = response.data;

    if (data.status === "OK") {
      // Get lat and long from first result
      const firstResult = data.addresses[0];
      const latitude = firstResult.y;
      const longitude = firstResult.x;

      // Send only lat and long in the response
      res.json({ latitude, longitude });
    } else {
      res.status(404).json({ error: "Geocoding failed" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
