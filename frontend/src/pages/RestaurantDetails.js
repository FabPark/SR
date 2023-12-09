import React, { useState, useEffect, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "../App.css";
import axios from "axios";
import NaverMapForDetails from "../components/NaverMapForDetails";
import { useAuthContext } from "../hooks/useAuthContext";

import "flowbite/dist/flowbite.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RestaurantDetails() {
  const { user } = useAuthContext();

  const { restaurantId } = useParams();
  const navigate = useNavigate();
  const [selectedRestaurant, setSelectedRestaurant] = useState({});

  const [geocodeData, setGeocodeData] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletionReason, setDeletionReason] = useState("");


  const isInitialRender = useRef(true);

  console.log("Params:", useParams());

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log("Inside useEffect - restaurantId:", restaurantId);

    const fetchData = async () => {
      try {
        const restaurantResponse = await axios.get(
          `https://sr-back.onrender.com/api/restaurants/${restaurantId}`
        );
        console.log("Restaurant Data:", restaurantResponse.data);
        setSelectedRestaurant(restaurantResponse.data);
        console.log("Inside fetchData - restaurantId:", restaurantId);

        const geocodeResponse = await axios.get(
          `https://sr-back.onrender.com/api/geocode/${restaurantId}`
        );
        setGeocodeData(geocodeResponse.data);
        confirmDeleteAfterUpdate();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (restaurantId) {
      console.log("Inside condition - restaurantId:", restaurantId);
      fetchData();
    } else {
      console.error("Invalid restaurantId:", restaurantId);
    }
  }, [restaurantId]);

  const confirmDeleteAfterUpdate = () => {
    if (!isInitialRender.current && restaurantId && selectedRestaurant._id) {
      confirmDelete(selectedRestaurant);
    }
  };

  console.log("Outside useEffect - restaurantId:", restaurantId);

  const onDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      console.log(
        "Inside confirmDelete - selectedRestaurant:",
        selectedRestaurant
      );

      if (
        selectedRestaurant &&
        selectedRestaurant.englishName &&
        selectedRestaurant.address &&
        selectedRestaurant.phoneNumber &&
        selectedRestaurant.rating
      ) {
        const data = {
          englishName: selectedRestaurant.englishName,
          address: selectedRestaurant.address,
          phoneNumber: selectedRestaurant.phoneNumber,
          rating: selectedRestaurant.rating,
          reason: deletionReason,
        };

        await axios.delete(
          `https://sr-back.onrender.com/delete/${selectedRestaurant._id}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
            data: data,
          }
        );
        toast.success("Restaurant Delete Request sent successfully!");

        navigate("/");
      } else {
        console.error("Required fields are missing.");
      }
    } catch (error) {
      console.log("Error from confirmDelete", error);
      toast.error("Error adding restaurant. Please try again.");
    } finally {
      setShowDeleteModal(false);
    }
  };

  const onSignUpClick = () => {
    navigate("/signup");
  };

  const onHomePageClick = () => {
    navigate("/");
  };

  return (
    <div className="bg-white flex justify-center items-center">
      <div className="w-50 flex-col justify-center items-center bg-white p-10 rounded-lg shadow sm:p-10 dark:bg-gray-800 dark:border-gray-700">
        <img
          src={selectedRestaurant.img}
          alt="Restaurants"
          className="mx-auto"
          height={800}
          width={400}
        />
        <br />
        <div>
          <h1 className="headlogo text-5xl font-extrabold text-center mb-.5">
            {selectedRestaurant.englishName}
          </h1>
        </div>
        <div>
          <h1 className="text-s font-medium lead text-center text-gray-900 dark:text-white mb-.5">
            {selectedRestaurant.koreanName}
          </h1>
        </div>
        <br />
        <br />
        <div className="text-left">
          <h5 className="text-xl font-light lead text-left text-gray-900 dark:text-white">
            {selectedRestaurant.info}
          </h5>
        </div>
        <br />
        <hr /> <br />
        <div className="flow-root">
          <ul
            role="list"
            className="divide-transparent dark:divide-transparent"
          >
            <li className="py-1 sm:py-1">
              <h1 className="headlogo text-3xl font-bold leading-tight text-gray-900 dark:text-white mb-0.5">
                Key Information
              </h1>
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"
                  />
                </svg>

                <p class="text-xl font-light text-gray-900 truncate dark:text-white ml-2">
                  Category
                </p>
                <p class="text-xl text-gray-500 truncate dark:text-gray-400 ml-2">
                  {selectedRestaurant.englishCategory &&
                  selectedRestaurant.englishCategory.length > 0
                    ? selectedRestaurant.englishCategory.join(", ")
                    : "No categories available"}
                </p>
              </div>
            </li>
            <li className="py-1 sm:py-1">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
                  />
                </svg>
                <p class="text-xl font-medium text-gray-900 truncate dark:text-white ml-2">
                  Address
                </p>
                <p class="text-xl text-gray-500 truncate dark:text-gray-400 ml-2">
                  {selectedRestaurant.address}
                </p>
              </div>
            </li>

            <li className="py-1 sm:py-1">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                  />
                </svg>

                <p class="text-xl font-light text-gray-900 truncate dark:text-white ml-2">
                  Phone Number
                </p>
                <p class="text-xl text-gray-500 truncate dark:text-gray-400 ml-2">
                  {selectedRestaurant.phoneNumber}
                </p>
              </div>
            </li>
            <li className="py-1 sm:py-1">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                  />
                </svg>
                <p class="text-xl font-light text-gray-900 truncate dark:text-white ml-2">
                  Rating
                </p>
                <p class="text-xl text-gray-500 truncate dark:text-gray-400 ml-2">
                  {selectedRestaurant.rating}
                </p>
              </div>
            </li>
            <li className="py-1 sm:py-1">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                  />
                </svg>
                <Link
                  to={`https://pcmap.place.naver.com/restaurant/${restaurantId}/home`}
                  target="_blank"
                  className="text-xl font-light text-gray-900 truncate dark:text-white ml-2"
                >
                  Visit for More Info
                </Link>
              </div>
            </li>
            <br />
            <br />
            <br />
          </ul>
        </div>
        <div className="dark:bg-gray-800">
          <NaverMapForDetails
            restaurantId={restaurantId}
            geocodeData={geocodeData}
          />
        </div>
        <div className="w-full bg-white rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
  {!user ? (
      <div className="text-center mb-4">
      <p class="text-xl font-light text-gray-900 truncate dark:text-white ml-2">
        Please sign up to edit restaurant information.</p>
        <br />
      <button
        onClick={onSignUpClick}
        className="w-1/2 bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mx-auto mb-4"
      >
        Sign Up
      </button>
      <br />


      <button
        onClick={onHomePageClick}
        className="w-1/2 bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mx-auto mb-4"
        >
        Go Back to Homepage
      </button>
    </div>
  ) : null}
</div>
<br />

        <div className="flex justify-between mb-4">
          <div className="w-full max-w-md p-4 bg-white rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            {user ? (
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-red-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={onDeleteClick}
              >
                Delete Restaurant
              </button>
            ) : (
              <div>
              </div>
            )}
          </div>

          <div className="w-full max-w-md p-4 bg-white rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            {user ? (
              <Link
                to={`/edit-restaurant/${restaurantId}`}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Update Restaurant
              </Link>
            ) : null}
          </div>
        </div>
        {showDeleteModal && (
          <div className="fixed inset-0 z-50 overflow-auto bg-smoke-dark flex items-center justify-center h-full">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
              <div className="relative p-8 bg-white shadow-md sm:rounded-md">
                <h1 className="text-xl font-semibold mb-4">
                  Enter Deletion Reason
                </h1>
                <textarea
                  rows="4"
                  className="w-full border rounded-md p-2"
                  placeholder="Enter reason for deletion..."
                  value={deletionReason}
                  onChange={(e) => setDeletionReason(e.target.value)}
                ></textarea>
                <div className="mt-4 flex justify-end">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
                    onClick={() => setShowDeleteModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-md"
                    onClick={confirmDelete}
                  >
                    Confirm Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RestaurantDetails;