/* eslint-disable */
import React, { useEffect, useState } from "react";
import "flowbite/dist/flowbite.css";

const NaverMapForDetails = ({ restaurantId, geocodeData }) => {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=d95j10j8u8";
    script.async = true;

    // callback function when script is loaded
    script.onload = () => {
      setScriptLoaded(true);
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (scriptLoaded && geocodeData) {
      console.log("Latitude:", geocodeData.latitude);
      console.log("Longitude:", geocodeData.longitude);

      const map = new naver.maps.Map("mapForDetails", {
        center: new naver.maps.LatLng(
          geocodeData.latitude,
          geocodeData.longitude
        ),
        zoom: 17,
      });

      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(
          geocodeData.latitude,
          geocodeData.longitude
        ),
        map: map,
        title: geocodeData.name,
      });
    }
  }, [scriptLoaded, geocodeData]);

  return (
    <div
      id="mapForDetails"
      style={{ width: "100%", height: "400px", margin: 0, padding: 0 }}
    ></div>
  );
};

export default NaverMapForDetails;
