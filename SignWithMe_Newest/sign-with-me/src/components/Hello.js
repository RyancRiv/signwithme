import React, { useEffect, useState } from "react";
import axios from "axios";

const Hello = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Make sure the backend URL is correct (e.g., stored in .env)
    axios
      .get("https://signwithme-92dm.onrender.com/api")
      .then((response) => {
        console.log(response); // Check the response structure in the console
        setMessage(response.data.message); // Assuming the backend returns a { message: '...' } object
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  return (
    <div>
      <h1>{message ? message : "Loading..."}</h1>
    </div>
  );
};

export default Hello;
