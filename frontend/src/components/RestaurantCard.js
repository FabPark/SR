import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

const StarIcon = () => (
  <svg
    className="w-4 h-4 text-yellow-300 ms-1"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 22 20"
  >
    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
  </svg>
);

const RestaurantCard = (props) => {
  const restaurant = props.restaurant;

  console.log("Restaurant ID:", restaurant._id);

  return (
    <div className="card-container w-full">
      <img
        src={restaurant.img}
        alt="Restaurants"
        height={80}
        className="w-full"
      />
      <div className="desc bg-gray-300 w-full">
        <h2 className="headlogo text-sm font-medium text-gray-900 truncate leading-tight dark:text-white">
          <Link to={`/restaurant-detail/${restaurant._id}`}>
            {restaurant.englishName}
          </Link>
        </h2>
        <h3 className="text-sm text-gray-800 truncate dark:text-gray-400">
          {restaurant.englishCategory && restaurant.englishCategory.length > 0
            ? restaurant.englishCategory.join(", ")
            : "No categories available"}
        </h3>
        <div className="flex items-center justify-center">
          <StarIcon />
          <p className="text-gray-900 dark:text-white">{restaurant.rating}</p>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
