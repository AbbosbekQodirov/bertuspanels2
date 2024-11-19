import React, { useState } from "react";
import "./GiveSalary.css";
import { getToken } from "../../service/token";
import { baseUrl } from "../../config";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
function GiveSalary({ id, setShowGiveSalary, changedData, setChangedData }) {
  const [type, settype] = useState("kpi");
  const [money, setmoney] = useState("");
  const [comment, setcomment] = useState("");
  const [currency, setcurrency] = useState("sum");
  const addData = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${getToken()}`);

    const raw = JSON.stringify({
      type,
      worker_id: id,
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

    fetch(`${baseUrl}/salaries/create`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setChangedData(!changedData)
        toast.success("Амалиёт муваффақиятли амалга оширилди");
        setShowGiveSalary(false);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Нимадир хато кетти қайтадан уруниб кўринг");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addData();
  };

  return (
    <div className="giveSalary">
      <div className="addForm">
        <button
          onClick={() => {
            setShowGiveSalary(false);
          }}
        >
          <img src="/imgs/exitModal.svg" alt="" />
        </button>
        <h3>Ойлик бериш</h3>
        <form onSubmit={handleSubmit} action="">
          <div>
            <select
              onChange={(e) => {
                settype(e.target.value);
              }}
              name=""
              id=""
            >
               
              <option value="kpi">кпи</option>
              <option value="work_day_bonus">Кунлик бонус</option>
              <option value="extra_bonus">ехтра_бонус</option>
              <option value="penalty">Жарима</option>
              <option value="pension">пенсия</option>
              <option value="advance">аванс</option>
              <option value="absolute">абсолуте</option>
              <option value="loan">Қарзини олиш</option>
            </select>
            {/* <label htmlFor="">
              {" "}
              <input   placeholder="Hodim turi :" type="text" />
            </label> */}
            <label htmlFor="">
              {" "}
              <input
                onChange={(e) => {
                  setcomment(e.target.value);
                }}
                placeholder="Изоҳ қўшиш"
                type="text"
              />
            </label>

            {/* <label htmlFor="">
              <input   placeholder="KPI " type="text" /> UZS
            </label> */}
            {/* <label htmlFor="">
              <input   placeholder="Pop bonus Pererabotka " type="text" /> UZS
            </label> */}
          </div>
          <div>
            <label htmlFor="">
              <input
                value={money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
                onChange={(e) => {
                  setmoney(e.target.value.toString().replaceAll(" ", ""));
                }}
                placeholder="Пул миқдори:"
                type="text"
              />{" "}
            </label>
            <select
              onChange={(e) => {
                setcurrency(e.target.value);
              }}
              name=""
              id=""
            >
              <option value="sum">сум</option>
              <option value="dollar">доллар</option>
            </select>
            {/* <label htmlFor="">
              <input   placeholder="Qarzlariga :" type="text" /> UZS
            </label> */}
            {/* <label htmlFor="">
              <input   placeholder="Shtraflarga :" type="text" /> UZS
            </label> */}
            {/* <label htmlFor="">
              <input   placeholder="Pensiyoniylariga : " type="text" /> UZS
            </label> */}
            {/* <label htmlFor="">
              <input   placeholder="Olgan avansiga :" type="text" /> UZS
            </label> */}
            {/* <label htmlFor="">
              Ishlamagan kuniga minus :
              <input   className="workChack" type="checkbox" />
            </label> */}
            <button>Берилди</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default GiveSalary;
