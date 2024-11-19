import React, { useState } from "react";
import "./Print.css";
import { baseUrl } from "../../config";
import { getToken } from "../../service/token";
import { toast } from "react-toastify";

import * as XLSX from "xlsx";

function Print({ setShowPrint }) {
  const [reportType, setReportType] = useState("daily_report_sums");

  const downloadExcel = (data) => {
    var aboutWorker = [];
    data.forEach((item) => {
      var obj = {
        Sendvich: item.sandwich,
        "Boshqa daromadlar": item.other_income,
        Odatiy: item.usual,
        "Oziq ovqat": item.food,
        Daromad: item.benefit,
        Avanslar: item.advance,
        pena: item.pena,
        "Yol xaqqi": item.toll,
        "Boshqa chiqimlar": item.other_expense,
        Sana: item.date,
      };
      aboutWorker.push(obj);
    });
    if (data.length > 0) {
      const worksheet = XLSX.utils.json_to_sheet(aboutWorker);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Ma'lumotlar");
      XLSX.writeFile(workbook, "Malumotlar.xlsx");
    } else {
      toast("Малумот топилмади");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const apiLink = `${baseUrl}/${reportType}/get?ident=0&page=1&limit=25`;
    console.log(apiLink);

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getToken()}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(apiLink, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        downloadExcel(result.data);
      })
      .catch((error) => console.error(error));
  };

  const createReport = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getToken()}`);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${baseUrl}/${reportType}/create`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        
        if(result.detail){
          toast(result.detail);
        }else{
          toast.success("Ҳисобот яратилди");
        }
      })
      .catch((error) => console.error(error));
  };

  const updateReport =()=>{
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getToken()}`);

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${baseUrl}/${reportType}/update`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.detail) {  
          toast(result.detail);
        } else {
          toast("Ҳисобот тасдиқланди");
        }
      })
      .catch((error) => console.error(error));
  }

  const confirmation = ()=>{
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getToken()}`);

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${baseUrl}/${reportType}/confirmation`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.detail) {
          toast(result.detail);
        } else {
          toast("Ҳисобот тасдиқланди");
        }
      })
      .catch((error) => console.error(error));
  }


  return (
    <div className="addreport">
      <div className="addForm">
        <button
          onClick={() => {
            setShowPrint(false);
          }}
        >
          <img src="/imgs/exitModal.svg" alt="" />
        </button>
        <form onSubmit={handleSubmit} action="">
          <select
            onChange={(e) => {
              setReportType(e.target.value);
            }}
            name=""
            id=""
            value={reportType}
          >
            <option value="daily_report_sums">Кунлик Сўмда</option>
            <option value="daily_report_dollars">Кунлик Долларда</option>
            <option value="monthly_reports">Ойлик</option>
          </select>
          <button type="button" onClick={createReport}>
            Ҳисоботни яратиш
          </button>
          <button type="button" onClick={updateReport}>
            Ҳисоботни янгилаш
          </button>
          <button type="button" onClick={confirmation}>
            Ҳисоботни Тасдиқлаш
          </button>

          <button>Чоп етиш</button>
        </form>
      </div>
    </div>
  );
}

export default Print;
