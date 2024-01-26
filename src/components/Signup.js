import React, { useState } from "react";
import axios from "axios";

const Signup = ({ setToken }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const [sucessMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { name, email, password, confirmpassword } = user;

  const updateUser = (e) => {
    let key = e.target.name;
    let value = e.target.value;
    setUser({ ...user, [key]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password == confirmpassword) {
      try {
        const response = await axios.post(
          "https://instagram-express-app.vercel.app/api/auth/signup",
          {
            name,
            email,
            password,
          }
        );

        console.log("sucess", response.data);
        setSuccessMessage(response.data.message);
        setErrorMessage("");
        setUser({
          name: "",
          email: "",
          password: "",
          confirmpassword: "",
        });
        setToken(response.data.data.token);
      } catch (error) {
        console.log("failure", error);
        setErrorMessage(error.response.data.message);
        setSuccessMessage("");
      }
    } else {
      setErrorMessage("Passwords do not match");
      setSuccessMessage("");
    }
  };

  return (
    <>
      <h1>SignUp</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="name"
          name="name"
          value={name}
          onChange={updateUser}
        />
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
        <input
          type="password"
          placeholder="confirm password"
          name="confirmpassword"
          value={confirmpassword}
          onChange={updateUser}
        />
        <button type="submit" className="signbtn">
          Signup
        </button>
      </form>
      <div className="msgArea">
        {sucessMessage && <p className="success">{sucessMessage}</p>}
        {errorMessage && <p className="danger">{errorMessage}</p>}
      </div>
    </>
  );
};
export default Signup;
