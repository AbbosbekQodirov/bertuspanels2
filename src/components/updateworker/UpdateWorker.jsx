import React, { useEffect, useState } from "react";
import "./UpdateWorker.css";
import { getToken } from "../../service/token";
import { baseUrl } from "../../config";
import { toast } from "react-toastify";
function UpdateWorker({
  id,
  changedData,
  setChangedData,
  setShowUpdateWorker,
}) {
  const [name, setname] = useState("");
  const [workdays, setworkdays] = useState("");
  const [fixed, setfixed] = useState("");
  const [part, setpart] = useState("");

  const getdata = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getToken()}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${baseUrl}/workers/get?ident=${id}&page=1&limit=25`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        
        setname(result.data[0].name);
        setworkdays(result.data[0].workdays);
        setfixed(result.data[0].fixed);
        setpart(result.data[0].part);
      })
      .catch((error) => console.error(error));
  };

  const updateData = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${getToken()}`);

    const raw = JSON.stringify({
      id,
      name,
      workdays,
      fixed: Number(fixed),
      part,
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${baseUrl}/workers/update`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        toast.success("Амалиёт муваффақиятли амалга оширилди");
        setShowUpdateWorker(false);
        setChangedData(!changedData);
      })
      .catch((error) => console.error(error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateData();
  };
  

  useEffect(() => {
    getdata();
  }, []);
  return (
    <div className="updateWorker">
      <div className="addForm">
        <button
          onClick={() => {
            setShowUpdateWorker(false);
          }}
        >
          <img src="/imgs/exitModal.svg" alt="" />
        </button>
        <h3>Ҳодим Маълумотларини ўзгартириш</h3>
        <form onSubmit={handleSubmit} action="">
          <div>
            <h4>Ҳодим тури</h4>
            <select
              value={part}
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
            <h4>Исм Фамиляси</h4>
            <label htmlFor="">
              {" "}
              <input required 
                value={name}
                onChange={(e) => {
                  setname(e.target.value);
                }}
                placeholder="Исм фамиляси :"
                type="text"
              />
            </label>
            <h4>Фикса ойлик</h4>
            <label htmlFor="">
              <input required 
                value={fixed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
                onChange={(e) => {
                  setfixed(e.target.value.toString().replaceAll(" ", ""));
                }}
                placeholder="Фикса ойлик: "
                type="text"
              />{" "}
              УЗС
            </label>
            <h4>Бу ой ишлади</h4>
            <label htmlFor="">
              <input required 
                value={workdays}
                onChange={(e) => {
                  setworkdays(e.target.value);
                }}
                placeholder="Бу ой ишлади:"
                type="text"
              />{" "}
              кун
            </label>
            {/* <label htmlFor="">
              <input required  placeholder="KPI " type="text" /> UZS
            </label>
            <label htmlFor="">
              <input required  placeholder="Pop bonus Pererabotka " type="text" /> UZS
            </label> */}
          </div>
          <div>
            {/* <label htmlFor="">
              <input required  placeholder="Qarzlariga :" type="text" /> UZS
            </label>
            <label htmlFor="">
              <input required  placeholder="Shtraflarga :" type="text" /> UZS
            </label>
            <label htmlFor="">
              <input required  placeholder="Pensiyoniylariga : " type="text" /> UZS
            </label>
            <label htmlFor="">
              <input required  placeholder="Olgan avansiga :" type="text" /> UZS
            </label>
            <label htmlFor="">
              Ishlamagan kuniga minus :
              <input required  className="workChack" type="checkbox" />
            </label> */}
          </div>
          <button>Янгилаш</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateWorker;
