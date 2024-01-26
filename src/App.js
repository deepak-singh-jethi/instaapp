import "./App.css";
import React, { useState, useEffect } from "react";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

function App() {
  const [token, setToken] = useState("");
  const [page, setPage] = useState("");

  useEffect(() => {
    setPage("login");
  }, []);

  return (
    <>
      <div className="strip"></div>
      {!token ? (
        <div className="App">
          <div className="selectedPage">
            {page === "signup" && <Signup setToken={setToken} />}
            {page === "login" && <Login setToken={setToken} />}
          </div>

          {page === "login" && (
            // dont have a account then signUp heading
            <div className="selectPage">
              <span>Don't have an account </span>
              <a onClick={() => setPage("signup")} href="#">
                SignUp
              </a>
            </div>
          )}
          {page === "signup" && (
            <div className="selectPage">
              <span>Already have an account </span>
              <a onClick={() => setPage("login")} href="#">
                SignIN
              </a>
            </div>
          )}
        </div>
      ) : (
        <Dashboard token={token} setToken={setToken} />
      )}
    </>
  );
}

export default App;
