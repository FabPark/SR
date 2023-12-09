import React, { useState } from "react";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddRestaurant = (props) => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [reason, setReason] = useState("");

  const onReasonChange = (e) => {
    setReason(e.target.value);
  };

  const [restaurant, setRestaurant] = useState({
    englishName: "",
    address: "",
    phoneNumber: "",
    rating: "",
  });

  const onSignUpClick = () => {
    navigate("/signup");
  };

  const onChange = (e) => {
    setRestaurant({ ...restaurant, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        "https://sr-back.onrender.com/api/add",
        { ...restaurant, reason },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((res) => {
        setRestaurant({
          englishName: "",
          address: "",
          phoneNumber: "",
          rating: "",
        });
        setReason("");
        toast.success("Add Restaurant Request sent successfully!");
        navigate("/");
      })
      .catch((err) => {
        console.log("Error in AddRestaurant!");
        toast.error("Error adding restaurant. Please try again.");
      });
  };

  if (!user) {
    return (
      <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign Up
            </h2>
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="login-container">
              <div className="message">
                Please sign up to edit restaurant information.
              </div>
              <button
                onClick={onSignUpClick}
                type="Sign Up"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {" "}
                Sign Up
              </button>
              <br />
              <br />
              <button
                onClick={() => navigate("/")}
                type="Homepage"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {" "}
                Homepage
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="mt-10 sm:mx-auto sm:w-full md:w-1/2 lg:max-w-2xl">
        <h2 className="headlogo mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Add Restaurant
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
            Add Restaurant
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRestaurant;
