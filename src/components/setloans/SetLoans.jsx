import React, { useState } from "react";
import "./SetLoans.css";
import { getToken } from "../../service/token";
import { baseUrl } from "../../config";
import { toast } from "react-toastify";
function SetLoans({ id, setShowLoans, changedData, setChangedData }) {
  const [value, setValue] = useState("");

  const setCurrenc = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${getToken()}`);

    const raw = JSON.stringify({
      total: value,
      worker_id: id,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${baseUrl}/loans/create`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setShowLoans(false);
        setChangedData(!changedData)
        toast.success("Амалиёт Мувофақиятли бажарилди");
      })
      .catch((error) => console.error(error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrenc();
  };

  return (
    <div className="setLoans">
      <div className="addForm">
        <button
          onClick={() => {
            setShowLoans(false);
          }}
        >
          <img src="/imgs/exitModal.svg" alt="" />
        </button>
        <h3>Қарз миқдорини белгилаш</h3>
        <form onSubmit={handleSubmit} action="">
          <div>
            <label htmlFor="">
              {" "}
              <input
                value={value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
                onChange={(e) => {
                  setValue(e.target.value.toString().replaceAll(" ", ""));
                }}
                placeholder="Бериладиган пул миқдорини киритинг!"
                type="text"
              />
            </label>
            <button>Берилди</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SetLoans;
