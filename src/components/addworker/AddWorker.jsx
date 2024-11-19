import React, { useState } from "react";
import "./AddWorker.css";
import { getToken } from "../../service/token";
import { baseUrl } from "../../config";
import { toast } from "react-toastify";
function AddWorker({ changedData, setChangedData, setShowAddWorker }) {
  const [name, setname] = useState("");
  const [workdays, setworkdays] = useState("");
  const [fixed, setfixed] = useState("");
  const [part, setpart] = useState("");
  const addData = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${getToken()}`);

    const raw = JSON.stringify({
      name,
      workdays,
      fixed,
      part,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${baseUrl}/workers/create`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        toast.success("Амалиёт муваффақиятли амалга оширилди");
        setShowAddWorker(false);
        setChangedData(!changedData)
      })
      .catch((error) => console.error(error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addData();
  };
  
  return (
    <div className="addWorker">
      <div className="addForm">
        <button
          onClick={() => {
            setShowAddWorker(false);
          }}
        >
          <img src="/imgs/exitModal.svg" alt="" />
        </button>
        <h3>Ҳодим қўшиш</h3>
        <form onSubmit={handleSubmit} action="">
          <div>
            <select
              onChange={(e) => {
                setpart(e.target.value);
              }}
              name=""
              id=""
            >
              <option value="office">оффиcе</option>
              <option value="sandwich">сандшич</option>
              <option value="peno_cutting">пено_cуттинг</option>
              <option value="peno_making">пено_макинг</option>
              <option value="other">отҳер</option>
            </select>
            {/* <label htmlFor="">
              {" "}
              <input required  placeholder="Hodim turi :" type="text" />
            </label> */}
            <label htmlFor="">
              {" "}
              <input required 
                onChange={(e) => {
                  setname(e.target.value);
                }}
                placeholder="Исм фамиляси :"
                type="text"
              />
            </label>

            {/* <label htmlFor="">
              <input required  placeholder="KPI " type="text" /> UZS
            </label> */}
            {/* <label htmlFor="">
              <input required  placeholder="Pop bonus Pererabotka " type="text" /> UZS
            </label> */}
          </div>
          <div>
            <label htmlFor="">
              <input required 
                onChange={(e) => {
                  setfixed(e.target.value);
                }}
                placeholder="Фикса ойлик: "
                type="text"
              />{" "}
              УЗС
            </label>
            <label htmlFor="">
              <input required 
                onChange={(e) => {
                  setworkdays(e.target.value);
                }}
                placeholder="Бир ойда ишлайди :"
                type="text"
              />{" "}
              кун
            </label>
            {/* <label htmlFor="">
              <input required  placeholder="Qarzlariga :" type="text" /> UZS
            </label> */}
            {/* <label htmlFor="">
              <input required  placeholder="Shtraflarga :" type="text" /> UZS
            </label> */}
            {/* <label htmlFor="">
              <input required  placeholder="Pensiyoniylariga : " type="text" /> UZS
            </label> */}
            {/* <label htmlFor="">
              <input required  placeholder="Olgan avansiga :" type="text" /> UZS
            </label> */}
            {/* <label htmlFor="">
              Ishlamagan kuniga minus :
              <input required  className="workChack" type="checkbox" />
            </label> */}
            <button>Қўшиш</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddWorker;
