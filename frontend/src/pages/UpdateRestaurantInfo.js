import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";

import { useAuthContext } from "../hooks/useAuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UpdateRestaurantInfo(props) {
  const [restaurant, setRestaurant] = useState({
    englishName: "",
    address: "",
    phoneNumber: "",
    rating: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [reason, setReason] = useState("");

  const onReasonChange = (e) => {
    setReason(e.target.value);
  };

  const onSignUpClick = () => {
    navigate("/signup");
  };
  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/restaurants/${id}`)
      .then((res) => {
        setRestaurant({
          englishName: res.data.englishName,
          address: res.data.address,
          phoneNumber: res.data.phoneNumber,
          rating: res.data.rating,
        });
      })
      .catch((err) => {
        console.log("Error from UpdateRestaurantInfo");
      });
  }, [id]);

  const onChange = (e) => {
    setRestaurant({ ...restaurant, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      return (
        <div>
          <p>Please sign up to edit restaurant information.</p>
          <button onClick={onSignUpClick}>Sign Up</button>
          <Link to="/">Go Home</Link>
        </div>
      );
    } else {
      const data = {
        englishName: restaurant.englishName,
        address: restaurant.address,
        phoneNumber: restaurant.phoneNumber,
        rating: restaurant.rating,
        reason: reason,
      };
      axios
        .put(`http://localhost:4000/update`, data, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          navigate(`/restaurant-detail/${id}`);
          toast.success("Restaurant Update Request sent successfully!");
        })
        .catch((err) => {
          console.log("Error in UpdateRestaurantInfo!");
          toast.error("Error updating restaurant. Please try again.");
        });
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="mt-10 sm:mx-auto sm:w-full md:w-1/2 lg:max-w-2xl">
        <h2 className="headlogo mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Update Restaurant
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form noValidate onSubmit={onSubmit} className="space-y-6">
          <div className="relative">
            <label
              htmlFor="name"
              className="headlogo block text-m font-medium leading-6 text-gray-900"
            >
              Name
            </label>
            <input
              type="text"
              placeholder="Name of the Restaurant"
              name="englishName"
              className="block w-96 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={restaurant.englishName}
              onChange={onChange}
            />
          </div>

          <div className="relative">
            <label
              htmlFor="address"
              className="headlogo block text-sm font-medium leading-6 text-gray-900"
            >
              Address
            </label>
            <input
              type="text"
              placeholder="Address"
              name="address"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={restaurant.address}
              onChange={onChange}
            />
          </div>

          <div className="relative">
            <label
              htmlFor="phoneNumber"
              className="headlogo block text-sm font-medium leading-6 text-gray-900"
            >
              Phone Number
            </label>
            <input
              type="text"
              placeholder="Phone Number"
              name="phoneNumber"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={restaurant.phoneNumber}
              onChange={onChange}
            />
          </div>

          <div className="relative">
            <label
              htmlFor="rating"
              className="headlogo block text-sm font-medium leading-6 text-gray-900"
            >
              Rating
            </label>
            <input
              type="text"
              placeholder="Rating"
              name="rating"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={restaurant.rating}
              onChange={onChange}
            />
          </div>

          <div className="relative">
            <label
              htmlFor="Reason"
              className="headlogo block text-sm font-medium leading-6 text-gray-900"
            >
              Reason
            </label>
            <input
              type="text"
              placeholder="Reason"
              name="Reason"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={reason}
              onChange={onReasonChange}
            />
          </div>

          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Update Restaurant
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateRestaurantInfo;
