import { useLocation } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from "react";
import "./HomePage.css";

const HomePage = () => {
  // Get the user's email from the React Router location object
  const location = useLocation();
  const passedemail = location?.state?.email;

  // Set up a state variable to store the isFirstLogin value returned from the server
  const [isFirstLogin, setIsFirstLogin] = useState(null);

  // Use the useEffect hook to send a POST request to the server and update the isFirstLogin state
  useEffect(() => {
    // Send a POST request to the server with the user's email
    axios.post("http://localhost:2500/check", { email: passedemail })
      .then((response) => {
        // If the request is successful, update the isFirstLogin state with the value returned from the server
        setIsFirstLogin(response.data.isFirstLogin);
        // console.warn(response.data.isFirstLogin);
      })
      .catch((error) => {
        // If the request fails, log the error to the console
        console.error(error);
      });
  }, []);

  // Render a different message depending on the isFirstLogin value
  return (
    <div>
      <h1>Welcome To Home Page</h1>
      <h2>{passedemail}</h2>
      {isFirstLogin === null ? (
        // If the isFirstLogin value is null (i.e. the server response hasn't been received yet), display a loading message
        <div>Loading...</div>
      ) : isFirstLogin ? (
        // If isFirstLogin is true, the user is visiting for the first time, so display a welcome message for new users
        <div>Welcome, new user!</div>
      ) : (
        // If isFirstLogin is false, the user has visited before, so display a welcome back message
        <div>Welcome back!</div>
      )}
    </div>
  );
};

export default HomePage;
