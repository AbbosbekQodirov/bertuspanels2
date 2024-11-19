import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../config";
import { setRole, setToken } from "../../service/token";
import { toast } from "react-toastify";
function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const getTokenData = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Access-Control-Allow-Origin", "*");

    const urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "password");
    urlencoded.append("username", username);
    urlencoded.append("password", password);
    urlencoded.append("scope", "");
    urlencoded.append("client_id", "");
    urlencoded.append("client_secret", "");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch(`${baseUrl}/token`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.access_token) {
          setToken(result.access_token);
          setRole(result.role);
          navigate("/");
        } else {
          setUsername("");
          setPassword("");
          toast.error("Логин ёки парол хато");
        }
      })
      .catch((error) => console.error(error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getTokenData();
  };
  return (
    <div className="loginPage">
      <div className="loginForm">
        <div className="formLogo">
          <img src="/imgs/formLogo.png" alt="" />
        </div>
        <form onSubmit={handleSubmit} action="">
          <label>
            <img src="/imgs/formUser.svg" alt="" />
            <input
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              type="text"
              placeholder="Логин :"
            />
          </label>
          <label>
            <img src="/imgs/formPassword.svg" alt="" />
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              placeholder="Парол :"
            />
          </label>
          <button>Кириш</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
