const express = require("express");
const router = express.Router();
const Suwon = require("../../models/restaurantModel");
const PendingUpdates = require("../../models/pendingUpdates");
const { requireAuth } = require("../../middleware/requireAuth");
const { notifyAdminAboutRestaurantChange } = require("../../mail/notifyAdmin");

const requireAuthMiddleware = requireAuth;

require("dotenv").config();

router.get("/api/restaurants/:restaurantId", async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const numericId = parseInt(restaurantId, 10);

    if (isNaN(numericId)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    const restaurant = await Suwon.findOne({ _id: numericId });
    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }
    res.json(restaurant);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/api/restaurants", async (req, res) => {
  try {
    const {
      page = 1,
      limit = 15,
      sortBy = "rating",
      sortOrder = "desc",
    } = req.query;

    const results = await Suwon.find({})
      .sort({ [sortBy]: sortOrder })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalCount = await Suwon.countDocuments();

    res.set("X-Total-Count", totalCount);
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/", (req, res) => {
  Suwon.find()
    .then((restaurants) => res.json(restaurants))
    .catch((err) =>
      res.status(404).json({ norestaurantfound: "No Restaurants found" })
    );
});

router.get("/api/restaurant/:restaurantId/address", async (req, res) => {
  try {
    const { restaurantId } = req.params;

    const restaurant = await Suwon.findById(restaurantId);

    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    res.json({ address: restaurant.address });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/api/add", requireAuthMiddleware, async (req, res) => {
  try {
    const { englishName, address, phoneNumber, rating, reason } = req.body;

    const pendingUpdate = {
      user: req.user._id,
      action: "add",
      restaurantData: { englishName, address, phoneNumber, rating },
      reason,
    };

    await PendingUpdates.create(pendingUpdate);

    await notifyAdminAboutRestaurantChange(req.user, "Add Restaurant Request", {
      ...req.body,
      reason,
    });

    res
      .status(201)
      .json({ message: "Restaurant add request sent to admin for approval." });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/update", requireAuthMiddleware, async (req, res) => {
  try {
    const { reason } = req.body;

    const pendingUpdate = {
      user: req.user._id,
      restaurantId: req.params.id,
      action: "update",
      restaurantData: req.body,
      reason,
    };

    await PendingUpdates.create(pendingUpdate);

    await notifyAdminAboutRestaurantChange(
      req.user,
      "Update Restaurant Request",
      { ...req.body, reason }
    );

    res.json({
      message: "Restaurant update request sent to admin for approval.",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/delete/:id", requireAuthMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    const restaurant = await Suwon.findById(id);

    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    const pendingUpdate = {
      user: req.user._id,
      restaurantId: id,
      action: "delete",
      restaurantData: {
        englishName: restaurant.englishName,
        address: restaurant.address,
        phoneNumber: restaurant.phoneNumber,
        rating: restaurant.rating,
      },
      reason,
    };

    await PendingUpdates.create(pendingUpdate);

    await notifyAdminAboutRestaurantChange(
      req.user,
      "Delete Restaurant Request",
      {
        ...pendingUpdate.restaurantData,
        reason,
      }
    );

    res.json({
      message: "Restaurant delete request sent to admin for approval.",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
