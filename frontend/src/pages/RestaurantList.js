import React, { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";

import RestaurantCard from "../components/RestaurantCard";

import { Pagination } from "../components/Pagination";

function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    axios
      .get(
        `http://localhost:4000/api/restaurants?page=${currentPage}&limit=${itemsPerPage}`
      )
      .then((res) => {
        const sortedRestaurants = res.data.sort((a, b) => b.rating - a.rating);
        setRestaurants(sortedRestaurants);
        setTotalItems(parseInt(res.headers["x-total-count"]) || 0);
        console.log("Fetched restaurants:", sortedRestaurants);
      })
      .catch((err) => {
        console.log("Error from RestaurantList", err);
      });

    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }, [currentPage, itemsPerPage]);

  const maxColumns = 3;
  const maxRows = 5;

  const limitedRestaurants = restaurants.slice(0, maxColumns * maxRows);

  const handlePageChange = (newPage) => {
    console.log("Changing to page:", newPage);
    setCurrentPage(newPage);
  };

  return (
    <div className="flex flex-wrap justify-center rounded-lg shadow sm:p-8 dark:bg-gray-800">
      <div className="w-full text-center relative z-0">
        <img
          src="/images/Suwon.jpg"
          alt="Suwon"
          className="w-full fixed top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/3 z-[-1]"
          style={{ maxWidth: "1800px", maxHeight: "700px" }}
        />

        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/3 text-white">
          <h2
            className="headlogo text-4xl font-bold mt-4"
            style={{ fontSize: "3rem", fontWeight: "bold" }}
          >
            Welcome to Suwon
          </h2>

          <p className="text-2xl">
            Explore a variety of restaurants in Suwon city.
          </p>
        </div>
        <hr className="my-4" />
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <div
        className=" w-full relative z-10 mt-8 p-8 z-20 bg-white mx-auto"
        style={{ width: "100%" }}
      >
        <br />
        <br />
        <hr />
      </div>
      <div></div>
      <div
        className="w-full flex flex-wrap justify-center relative z-20 bg-white"
        style={{ width: "100%" }}
      >
        {limitedRestaurants.map((restaurant, k) => (
          <RestaurantCard restaurant={restaurant} key={k} />
        ))}
      </div>
      <br />
      <br />
      <br />
      <div className="w-full flex justify-center mt-8">
        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default RestaurantList;
