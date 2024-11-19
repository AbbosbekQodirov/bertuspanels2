import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import "./CashDetail.css";
import DetailTable from "../../components/detailTable/DetailTable";
import AddReport from "../../components/addreport/AddReport";
import { Link, useParams } from "react-router-dom";
import { getRole, getToken } from "../../service/token";
import { baseUrl } from "../../config";
import IncomeTable from "../../components/incomeDetailTable/IncomeTable";
function CashDetail({ startDate, endDate }) {
  const [showAdd, setShowAdd] = useState(false);
  const [incomeData, setIncomeData] = useState(null);
  const { type } = useParams();

  const getDetailIncome = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getToken()}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `${baseUrl}/incomes/get?ident=0&_type=${type}&start_date=${startDate}&end_date=${endDate}&page=1&limit=25`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setIncomeData(result);
      })
      .catch((error) => console.error(error));
  };
  useEffect(() => {
    getDetailIncome();
  });
  console.log(incomeData);

  return (
    <div className="cashdetail">
      {showAdd && <AddReport setShowAdd={setShowAdd} />}
      <div className="container">
        <nav>
          <div className="detailLogo">
            <Link to={"/"}>
              <img src="/imgs/mainlogo.png" alt="" />
            </Link>
          </div>
          <div>
            <h4>{`Кирим : ${type} жами : ${incomeData?.total_sum} УЗС /  ${incomeData?.total_dollar} УСД`}</h4>
            <button
              disabled={getRole() == "watcher" ? true : false}
              onClick={() => {
                setShowAdd(true);
              }}
            >
              Қўшиш
              <FaPlus />
            </button>
          </div>
        </nav>
        <IncomeTable data={incomeData?.data} setShowAdd={setShowAdd} />
      </div>
    </div>
  );
}

export default CashDetail;
