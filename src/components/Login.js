import React, { useState } from "react";
import axios from "axios";

const Login = ({ setToken }) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [sucessMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { email, password } = user;

  const updateUser = (e) => {
    let key = e.target.name;
    let value = e.target.value;
    setUser({ ...user, [key]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://instagram-express-app.vercel.app/api/auth/login",
        {
          email,
          password,
        }
      );

      console.log("sucess", response.data);
      setSuccessMessage(response.data.message);
      setErrorMessage("");
      setUser({
        email: "",
        password: "",
      });
      setToken(response.data.data.token);
    } catch (error) {
      console.log("failure", error);
      setErrorMessage(error.response.data.message);
      setSuccessMessage("");
    }
  };

  return (
    <>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="email"
          name="email"
          value={email}
          onChange={updateUser}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          value={password}
          onChange={updateUser}
        />
        <button type="submit" className="signbtn">
          SignIn
        </button>
      </form>
      <div className="msgArea">
        {sucessMessage && <p className="success">{sucessMessage}</p>}
        {errorMessage && <p className="danger">{errorMessage}</p>}
      </div>
    </>
  );
};

export default Login;
