import React, { useState } from "react";
import "./AddExpenses.css";
import { baseUrl } from "../../config";
import { getToken } from "../../service/token";
import { toast } from "react-toastify";
function AddExpenses({ addtype, setShowAdd }) {
  // console.log(type);

  const [comment, setComment] = useState("");
  const [money, setMoney] = useState("");
  const [type, setType] = useState("usual");
  const [currency, setCurrency] = useState("sum");

  const handleSubmit = (e) => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${getToken()}`);

    const raw = JSON.stringify({
      type,
      money,
      comment,
      currency,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${baseUrl}/expenses/create`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        toast.success("Амалиёт муваффақиятли амалга оширилди");
        setShowAdd(false);
      })
      .catch((error) => console.error(error));
  };
  return (
    <div className="addreport">
      <div className="addForm">
        <button
          onClick={() => {
            setShowAdd(false);
          }}
        >
          <img src="/imgs/exitModal.svg" alt="" />
        </button>
        <form onSubmit={handleSubmit} action="">
          <select
            onChange={(e) => {
              setType(e.target.value);
            }}
            value={type}
            name=""
            id=""
          >
               
            <option value="usual">Одатий</option>
            <option value="toll">Йўл хаққи</option>
            <option value="food">Озиқ-овқат</option>
            <option value="other">Бошқа</option>
          </select>

          <input
            // pattern="\d{1,9}"
            // title="Faqat 9 tagacha raqam kiriting"
            required
            value={money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
            onChange={(e) => {
              setMoney(e.target.value.toString().replaceAll(" ", ""));
            }}
            type="text"
            placeholder="Пул миқдори:"
          />
          <input
            required
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
            type="text"
            placeholder="Изоҳ / Маҳсулот номи :"
          />
          <select
            onChange={(e) => {
              setCurrency(e.target.value);
            }}
            name=""
            id=""
            value={currency}
          >
            <option value="sum">сум</option>
            <option value="dollar">доллар</option>
          </select>
          <button>Қўшиш</button>
        </form>
      </div>
    </div>
  );
}

export default AddExpenses;
