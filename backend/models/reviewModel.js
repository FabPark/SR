const { Schema, model, Types, mongoose } = require("mongoose");

//might use this later

const reviewsSchema = Schema(
  {
    rating: {
      type: Number,
      default: 1,
      validate: {
        validator: function (value) {
          return value >= 0 && value <= 5 && Number.isInteger(value);
        },
        message: "Rating must be an integer between 0 and 5.",
      },
    },
    comment: {
      type: String,
    },
    restaurantId: {
      type: Number,
      ref: "RestCard",
      index: true,
    },
    memberId: {
      type: mongoose.Types.ObjectId,
      ref: "members",
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("review", reviewsSchema);
