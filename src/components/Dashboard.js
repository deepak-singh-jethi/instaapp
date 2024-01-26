import React, { useState } from "react";
import axios from "axios";

const Dashboard = ({ token, setToken }) => {
  const [message, setMessage] = useState("");
  const handleSubmit = async () => {
    try {
      const response = await axios.get(
        "https://instagram-express-app.vercel.app/api/auth/zuku",
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setMessage(response.data.data.message);
    } catch (err) {
      console.log(err);
      setMessage(err.response.data.message);
    }
  };
  return (
    <div className="dashboard">
      <div>
        <p>{message}</p>
        <button onClick={handleSubmit} type="submit">
          Get a Joke
        </button>
      </div>
      <button onClick={() => setToken("")}>Logout</button>
    </div>
  );
};

export default Dashboard;
