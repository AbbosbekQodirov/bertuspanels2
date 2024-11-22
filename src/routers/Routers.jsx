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
import Chop from "../pages/chop/Chop";

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

  function getDate(offset = 0) {
    const today = new Date();
    today.setDate(today.getDate() + offset); // Kunni offsetga qarab o'zgartiramiz

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Oylarni 1 dan boshlab hisoblaymiz
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  const [startDate, setStartDate] = useState(getDate());
  const [endDate, setEndDate] = useState(getDate(1));

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <Home
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            inSystem={inSystem}
            setInSystem={setInSystem}
            getCourse={getCourse}
          />
        }
      />
      <Route
        path="/incomedetail/:type"
        element={<CashDetail startDate={startDate} endDate={endDate} />}
      />
      <Route
        path="/outcomedetail/:type"
        element={<OutCashDetail startDate={startDate} endDate={endDate} />}
      />
      <Route path="/staff" element={<Staff />} />
      <Route path="/worker/:id" element={<Worker />} />
      <Route path="/chop" element={<Chop/>} />
    </Routes>
  );
}

export default Routers;
