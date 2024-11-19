import React, { useState } from "react";
import "./SetCurrencies.css";
import { getToken } from "../../service/token";
import { baseUrl } from "../../config";
import { toast } from "react-toastify";
function  SetCurrencies({ getCourse, setShowCurrencies }) {
  const [value, setValue] = useState(null);

  const setCurrenc = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${getToken()}`);

    const raw = JSON.stringify({
      price: value,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${baseUrl}/currencies/create`, requestOptions)
      .then((response) => response.json())
      .then((result) => {

        toast.success("Амалиёт муваффақиятли амалга оширилди");
        getCourse();
        setShowCurrencies(false);
      })
      .catch((error) => console.error(error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrenc();
  };

  return (
    <div className="addCurrencies">
      <div className="addForm">
        <button
          onClick={() => {
            setShowCurrencies(false);
          }}
        >
          <img src="/imgs/exitModal.svg" alt="" />
        </button>
        <h3>Валюта курсини белгилаш</h3>
        <form onSubmit={handleSubmit} action="">
          <div>
            <label htmlFor="">
              {" "}
              <input
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                }}
                placeholder="1 доллар сомда қанча бўлишини киритинг:"
                type="number"
              />
            </label>
            <button>Ўрнатиш</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SetCurrencies;
