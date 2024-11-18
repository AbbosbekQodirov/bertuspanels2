import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "../pages/login/Login";
import CashDetail from "../pages/cashdetail/CashDetail";

import Home from "../pages/home/Home";
import { getToken } from "../service/token";
import OutCashDetail from "../pages/outcashdetail copy/OutCashDetail";
import { baseUrl } from "../config";
import Worker from "../pages/worker/Worker";
import Staff from "../pages/staff/Staff";

function Routers() {
  const [inSystem, setInSystem] = useState(false);
  const navigate = useNavigate();

  const getCourse = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getToken()}`);
    myHeaders.append("Access-Control-Allow-Origin", "*");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${baseUrl}/currencies/get?ident=0&status=true`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        localStorage.setItem("usdCourse", result?.data[0].price);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    if (getToken() == null) {
      navigate("/login");
    } else {
      // navigate("/");

      getCourse();
    }
  }, [inSystem]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <Home
            inSystem={inSystem}
            setInSystem={setInSystem}
            getCourse={getCourse}
          />
        }
      />
      <Route path="/incomedetail/:type" element={<CashDetail />} />
      <Route path="/outcomedetail/:type" element={<OutCashDetail />} />
      <Route path="/staff" element={<Staff />} />
      <Route path="/worker/:id" element={<Worker />} />
    </Routes>
  );
}

export default Routers;
