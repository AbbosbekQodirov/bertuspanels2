import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import "./OutCashDetail.css";
import DetailTable from "../../components/detailTable/DetailTable";
import AddReport from "../../components/addreport/AddReport";
import { Link, useParams } from "react-router-dom";
import { getToken } from "../../service/token";
import { baseUrl } from "../../config";
import AddExpenses from "../../components/addExpenses/AddExpenses";
function OutCashDetail({ startDate, endDate }) {
  const [showAdd, setShowAdd] = useState(false);
  const [outcomeData, setOutcomeData] = useState(null);
  const { type } = useParams();

  const [allSum, setAllSum] = useState(0);

  const getDetailOutcome = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getToken()}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `${baseUrl}/expenses/get?ident=0&_type=${type}&start_date=${startDate}&end_date=${endDate}&page=1&limit=25`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setOutcomeData(result);
      })
      .catch((error) => console.error(error));
  };
  useEffect(() => {
    getDetailOutcome();
  });
  return (
    <div className="cashdetail">
      {showAdd && <AddExpenses addtype={type} setShowAdd={setShowAdd} />}
      <div className="container">
        <nav>
          <div className="detailLogo">
            <Link to={"/"}>
              <img src="/imgs/mainlogo.png" alt="" />
            </Link>
          </div>
          <div>
            <h4>{`ЧИҚИМ : ${type} жами : ${outcomeData?.total_sum
              ?.toString()
              .replace(
                /\B(?=(\d{3})+(?!\d))/g,
                " "
              )} УЗС /  ${outcomeData?.total_dollar
              ?.toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, " ")} УСД`}</h4>
            <button
              onClick={() => {
                setShowAdd(true);
              }}
            >
              Қўшиш
              <FaPlus />
            </button>
          </div>
        </nav>
        <DetailTable data={outcomeData?.data} setShowAdd={setShowAdd} />
      </div>
    </div>
  );
}

export default OutCashDetail;
