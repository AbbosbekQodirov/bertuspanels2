import React, { useEffect, useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import { getRole, getToken } from "../../service/token";
import { baseUrl } from "../../config";

import AddReport from "../../components/addreport/AddReport";
import AddExpenses from "../../components/addExpenses/AddExpenses";
import SetCurrencies from "../../components/setcurrencies/SetCurrencies";
import Print from "../../components/print/Print";

function Home({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  inSystem,
  setInSystem,
  getCourse,
}) {
  const [incomeSandwich, setIncomeSandwich] = useState(null);
  const [incomePena, setIncomePena] = useState(null);
  const [incomeOther, setIncomeOther] = useState(null);
  const [outcomeUsual, setOutcomeUsual] = useState(null);
  const [outcomeToll, setOutcomeToll] = useState(null);
  const [outcomeFood, setOutcomeFood] = useState(null);
  const [outcomeOther, setOutcomeOther] = useState(null);
  const [outcomeAdvance, setOutcomeAdvance] = useState(null);

  const [allIncomeSumm, setAllIncomeSumm] = useState(null);
  const [allIncomeDollar, setAllIncomeDollar] = useState(null);
  const [allOutcomeSumm, setAllOutcomeSumm] = useState(null);
  const [allOutcomeDollar, setAllOutcomeDollar] = useState(null);

  const [showAdd, setShowAdd] = useState(false);
  const [showAddEx, setShowAddEx] = useState(false);
  const [showCurrencies, setShowCurrencies] = useState(false);
  const [showPrint, setShowPrint] = useState(false);

  const getAllIOutcome = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getToken()}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `${baseUrl}/expenses/get?ident=0&start_date=${startDate}&end_date=${endDate}&page=1&limit=25`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setAllOutcomeSumm(result.total_sum);
        setAllOutcomeDollar(result.total_dollar);
      })
      .catch((error) => console.error(error));
  };
  const getAllIncome = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getToken()}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `${baseUrl}/incomes/get?ident=0&start_date=${startDate}&end_date=${endDate}&page=1&limit=25`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setAllIncomeSumm(result.total_sum);
        setAllIncomeDollar(result.total_dollar);
      })
      .catch((error) => console.error(error));
  };

  const getIncomeSandwich = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getToken()}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `${baseUrl}/incomes/get?ident=0&_type=sandwich&start_date=${startDate}&end_date=${endDate}&page=1&limit=25`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setIncomeSandwich(result);
      })
      .catch((error) => console.error(error));
  };

  const getIncomePena = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getToken()}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `${baseUrl}/incomes/get?ident=0&_type=pena&start_date=${startDate}&end_date=${endDate}&page=1&limit=25`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setIncomePena(result);
      })
      .catch((error) => console.error(error));
  };
  const getIncomeOther = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getToken()}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `${baseUrl}/incomes/get?ident=0&_type=other&start_date=${startDate}&end_date=${endDate}&page=1&limit=25`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setIncomeOther(result);
      })
      .catch((error) => console.error(error));
  };

  const getOutComeUsual = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getToken()}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `${baseUrl}/expenses/get?ident=0&_type=usual&start_date=${startDate}&end_date=${endDate}&page=1&limit=25`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setOutcomeUsual(result);
      })
      .catch((error) => console.error(error));
  };

  const getOutComeToll = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getToken()}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `${baseUrl}/expenses/get?ident=0&_type=toll&start_date=${startDate}&end_date=${endDate}&page=1&limit=25`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setOutcomeToll(result);
      })
      .catch((error) => console.error(error));
  };

  const getOutComeFood = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getToken()}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `${baseUrl}/expenses/get?ident=0&_type=food&start_date=${startDate}&end_date=${endDate}&page=1&limit=25`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setOutcomeFood(result);
      })
      .catch((error) => console.error(error));
  };

  const getOutComeOther = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getToken()}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `${baseUrl}/expenses/get?ident=0&_type=other&start_date=${startDate}&end_date=${endDate}&page=1&limit=25`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setOutcomeOther(result);
      })
      .catch((error) => console.error(error));
  };

  const getOutComeAdvance = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getToken()}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `${baseUrl}/salaries/get?_type=advance&start_date=${startDate}&end_date=${endDate}&page=1&limit=25`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setOutcomeAdvance(result);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getIncomeSandwich();
    getIncomePena();
    getIncomeOther();
    getOutComeUsual();
    getOutComeToll();
    getOutComeFood();
    getOutComeOther();
    getOutComeAdvance();
    getAllIncome();
    getAllIOutcome();

    getCourse();
  }, [showAdd, showAddEx, showCurrencies, startDate, endDate]);

  console.log(outcomeAdvance);

  return (
    <div className="homePage">
      {showPrint && <Print setShowPrint={setShowPrint} />}
      {showAdd && <AddReport setShowAdd={setShowAdd} />}
      {showAddEx && <AddExpenses setShowAdd={setShowAddEx} />}
      {showCurrencies && (
        <SetCurrencies
          getCourse={getCourse}
          setShowCurrencies={setShowCurrencies}
        />
      )}
      <div className="container">
        <nav>
          <div className="mainLogo">
            <img src="/imgs/mainlogo.png" alt="" />
          </div>
          <ul className="mainLinks">
            <li>
              <button
                onClick={() => {
                  setShowPrint(true);
                  // downloadExcel(income);
                }}
              >
                Чоп етиш <img src="/imgs/print.svg" alt="" />{" "}
              </button>
            </li>

            {/* <li>
              <select name="" id="">
                <option value="">2024-yil</option>
                <option value="">2023-yil</option>
                <option value="">2024-yil</option>
              </select>
            </li>
            <li>
              <select name="" id="">
                <option value="">Noyabr</option>
                <option value="">Oktyabr</option>
                <option value="">Sentabr</option>
                <option value="">Avgust</option>
                <option value="">Iyul</option>
                <option value="">Iyun</option>
                <option value="">May</option>
                <option value="">Aprel</option>
                <option value="">Mart</option>
                <option value="">Fevral</option>
                <option value="">Yanvar</option>
                <option value="">Dekabr</option>
              </select>
            </li>
            <li>
              <select name="" id="">
                <option value="">Kun</option>
                <option value="">1</option>
                <option value="">2</option>
                <option value="">3</option>
                <option value="">4</option>
              </select>
            </li> */}
            <li>
              <Link to={"/staff"}>
                Ходимларымыз
                <img src="/imgs/worker.svg" alt="" />{" "}
              </Link>
            </li>
            <li className="inputDate">
              <input
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                }}
                type="date"
              />
              <span>дан</span>
            </li>
            <li className="inputDate">
              <input
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value);
                }}
                type="date"
              />{" "}
              <span>гача</span>
            </li>

            <li>
              <button
                disabled={getRole() == "watcher" ? true : false}
                onClick={() => {
                  setShowCurrencies(true);
                }}
              >
                Курс:{" "}
                {localStorage
                  .getItem("usdCourse")
                  ?.toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  localStorage.clear();
                  setInSystem(!inSystem);
                }}
                className="closeSystem"
              >
                Тизимдан чиқиш
              </button>
            </li>
          </ul>
        </nav>
        <div className="report">
          <div className="income">
            <h2>Кирим</h2>
            <h3>{allIncomeSumm} УЗС</h3>
            <h3>{allIncomeDollar} $</h3>
            <button
              onClick={() => {
                setShowAddEx(false);
                setShowAdd(true);
              }}
              disabled={getRole() == "watcher" ? true : false}
            >
              Кирим қўшиш
            </button>
          </div>
          <div className="outcome">
            <h2>ЧИҚИМ</h2>
            <h3>{allOutcomeSumm + outcomeAdvance?.total_sum} УЗС</h3>
            <h3>{allOutcomeDollar + outcomeAdvance?.total_dollar} $</h3>
            <button
              disabled={getRole() == "watcher" ? true : false}
              onClick={() => {
                setShowAddEx(true);
                setShowAdd(false);
              }}
            >
              Чиқим қўшиш
            </button>
          </div>
          <div className="given">
            <h2>ДАРОМАД</h2>
            <h3>
              {allIncomeSumm - allOutcomeSumm - outcomeAdvance?.total_sum}
              УЗС
            </h3>
            <h3>
              {allIncomeDollar -
                allOutcomeDollar -
                outcomeAdvance?.total_dollar}{" "}
              $
            </h3>
          </div>
        </div>
        <div className="allReport">
          <table>
            <tbody>
              {incomeSandwich && (
                <tr className="kirim">
                  <td>
                    <h3>КИРИМ</h3>
                  </td>
                  <td>Сендвич</td>
                  <td>{incomeSandwich.total_sum} УЗС</td>
                  <td>{incomeSandwich.total_dollar} $</td>
                  <td>
                    <Link to={`/incomedetail/sandwich`}>Батафсил малумот</Link>
                  </td>
                </tr>
              )}
              {incomePena && (
                <tr className="kirim">
                  <td>
                    <h3>КИРИМ</h3>
                  </td>
                  <td>Пена</td>
                  <td>{incomePena.total_sum} УЗС</td>
                  <td>{incomePena.total_dollar} $</td>
                  <td>
                    <Link to={`/incomedetail/pena`}>Батафсил малумот</Link>
                  </td>
                </tr>
              )}
              {incomeOther && (
                <tr className="kirim">
                  <td>
                    <h3>КИРИМ</h3>
                  </td>
                  <td>Бошқалар</td>
                  <td>{incomeOther.total_sum} УЗС</td>
                  <td>{incomeOther.total_dollar} $</td>
                  <td>
                    <Link to={`/incomedetail/other`}>Батафсил малумот</Link>
                  </td>
                </tr>
              )}
              {outcomeUsual && (
                <tr className="chiqim">
                  <td>
                    <h3>ЧИҚИМ</h3>
                  </td>
                  <td>Одатий</td>
                  <td>{outcomeUsual.total_sum} УЗС</td>
                  <td>{outcomeUsual.total_dollar} $</td>
                  <td>
                    <Link to={`/outcomedetail/usual`}>Батафсил малумот</Link>
                  </td>
                </tr>
              )}
              {outcomeToll && (
                <tr className="chiqim">
                  <td>
                    <h3>ЧИҚИМ</h3>
                  </td>
                  <td>Йўл ҳаққи</td>
                  <td>{outcomeToll.total_sum} УЗС</td>
                  <td>{outcomeToll.total_dollar} $</td>
                  <td>
                    <Link to={`/outcomedetail/toll`}>Батафсил малумот</Link>
                  </td>
                </tr>
              )}
              {outcomeFood && (
                <tr className="chiqim">
                  <td>
                    <h3>ЧИҚИМ</h3>
                  </td>
                  <td>Озиқ Овқат</td>
                  <td>{outcomeFood.total_sum} УЗС</td>
                  <td>{outcomeFood.total_dollar} $</td>
                  <td>
                    <Link to={`/outcomedetail/food`}>Батафсил малумот</Link>
                  </td>
                </tr>
              )}
              {outcomeOther && (
                <tr className="chiqim">
                  <td>
                    <h3>ЧИҚИМ</h3>
                  </td>
                  <td>Бошқалар</td>
                  <td>{outcomeOther.total_sum} УЗС</td>
                  <td>{outcomeOther.total_dollar} $</td>
                  <td>
                    <Link to={`/outcomedetail/other`}>Батафсил малумот</Link>
                  </td>
                </tr>
              )}
              {outcomeOther && (
                <tr className="chiqim">
                  <td>
                    <h3>ЧИҚИМ</h3>
                  </td>
                  <td>Aванс</td>
                  <td>{outcomeAdvance?.total_sum} УЗС</td>
                  <td>{outcomeAdvance?.total_dollar} $</td>
                  <td>
                    <Link to={`/staff`}>Батафсил малумот</Link>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Home;
