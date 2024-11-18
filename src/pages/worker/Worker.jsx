import React, { useEffect, useState } from "react";
import "./Worker.css";
import { Link, useParams } from "react-router-dom";
import AddWorker from "../../components/addworker/AddWorker";
import { baseUrl } from "../../config";
import { getRole, getToken } from "../../service/token";
import UpdateWorker from "../../components/updateworker/UpdateWorker";
import SetLoans from "../../components/setloans/SetLoans";
import GiveSalary from "../../components/givesalary/GiveSalary";
import { FaAnglesDown, FaAnglesUp } from "react-icons/fa6";
function Worker() {
  const [worker, setWorker] = useState(null);
  const [showAddWorker, setShowAddWorker] = useState(false);
  const [showUpdateWorker, setShowUpdateWorker] = useState(false);
  const [showLoans, setShowLoans] = useState(false);
  const [showGiveSalary, setShowGiveSalary] = useState(false);
  const [showGetSalary, setShowGetSalary] = useState(false);
  const [showAttended, setShowAttended] = useState(false);

  const [changedData, setChangedData] = useState(false);

  const [workerId, setWorkerId] = useState(0);

  const [part, setPart] = useState(null);

  const [searchName, setSearchName] = useState("");

  const { id } = useParams();

  const getWorker = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getToken()}`);
    myHeaders.append("Access-Control-Allow-Origin", "*");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${baseUrl}/workers/get?ident=${id}&page=1&limit=25`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);

        setWorker(result.data);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getWorker();
  }, [changedData]);

  const changeFormat = (dateStr) => {
    console.log(dateStr);

    // Sanani yaratish
    if (dateStr != null) {
      let date = new Date(dateStr);

      // Sana formatlash
      let day = String(date.getDate()).padStart(2, "0");
      let month = String(date.getMonth() + 1).padStart(2, "0"); // Oyi 0 dan boshlanadi
      let year = date.getFullYear();
      let hours = String(date.getHours()).padStart(2, "0");
      let minutes = String(date.getMinutes()).padStart(2, "0");
      let seconds = String(date.getSeconds()).padStart(2, "0");

      // Yangi format
      let formattedDate = `${day}.${month}.${year} - ${hours}:${minutes}:${seconds}`;
      return formattedDate;
    } else {
      return "- - - - - -";
    }
  };

  return (
    <div className="staff staff_worker">
      {showGiveSalary && (
        <GiveSalary
          id={workerId}
          setShowGiveSalary={setShowGiveSalary}
          changedData={changedData}
          setChangedData={setChangedData}
        />
      )}

      {showUpdateWorker && (
        <UpdateWorker
          id={workerId}
          changedData={changedData}
          setChangedData={setChangedData}
          setShowUpdateWorker={setShowUpdateWorker}
        />
      )}
      {showLoans && (
        <SetLoans
          id={workerId}
          setShowLoans={setShowLoans}
          changedData={changedData}
          setChangedData={setChangedData}
        />
      )}
      <div className="container">
        <nav>
          <div className="mainLogo">
            <Link to={"/"}>
              <img src="/imgs/mainlogo.png" alt="" />
            </Link>
          </div>
        </nav>

        <div className="workers">
          {worker?.map((item, index) => {
            return (
              <>
                <div className="worker">
                  <div className="worker_info">
                    <div>
                      <p>
                        <b>ФИШ:</b>
                      </p>
                      <p>{item.name}</p>
                    </div>
                  </div>
                  <div className="worker_info">
                    <div>
                      <p>
                        <b>Иш куни:</b>
                      </p>
                      <p>{item.workdays} кун</p>
                    </div>
                  </div>
                  <div className="worker_info">
                    <div>
                      <p>
                        <b>Фикса маоши:</b>{" "}
                      </p>
                      <p> {item.fixed}сўм</p>
                    </div>
                  </div>

                  <div className="worker_info">
                    <div>
                      <p>
                        <b>Баланси:</b>
                      </p>
                      <p>{item.balance}</p>
                    </div>
                  </div>
                  <div className="worker_info">
                    <div>
                      <p>
                        <b>Бўлим:</b>
                      </p>
                      <p>{item.part}</p>
                    </div>
                  </div>
                  <div className="worker_info">
                    <div>
                      <p>
                        <b>Олинган Ойликлар:</b>
                      </p>
                      <p>{item.balance}</p>
                    </div>
                  </div>
                  <div className="worker_info loans ">
                    <div>
                      <p>
                        <b>Олинган қарзлар:</b>
                      </p>{" "}
                      <br />
                      {item.loans[0]?.total ? (
                        <>
                          <p>
                            <b>Қиймати:</b> {item.loans[0]?.total}
                          </p>
                          <p>
                            <b>Қолган қарз:</b> {item.loans[0]?.residual}
                          </p>
                          <p>
                            <b>Санаси:</b>{" "}
                            {item.loans[0]?.datetime.slice(0, 10)}
                          </p>
                        </>
                      ) : (
                        <p>Қарз олинмаган!</p>
                      )}
                    </div>
                  </div>

                  <div className="controlWorker">
                    <button
                      onClick={() => {
                        setWorkerId(item.id);
                        setShowGiveSalary(true);
                      }}
                    >
                      Ойлик бериш{" "}
                    </button>
                    <button
                      onClick={() => {
                        setWorkerId(item.id);
                        setShowLoans(true);
                      }}
                    >
                      Қарз бериш{" "}
                    </button>
                    <button
                      disabled={getRole() == "watcher" ? true : false}
                      onClick={() => {
                        setWorkerId(item.id);
                        setShowUpdateWorker(true);
                      }}
                      className="workerEdit"
                    >
                      <img src="/imgs/editicon.svg" alt="" />
                    </button>
                  </div>
                </div>
                <div>
                  <h2
                    onClick={() => {
                      setShowGetSalary(!showGetSalary);
                    }}
                    className="worker_title_h2"
                  >
                    ОЛИНГАН ОЙЛИКЛАР БАТАФСИЛ:
                    <span>
                      {showGetSalary ? <FaAnglesUp /> : <FaAnglesDown />}
                    </span>
                  </h2>{" "}
                  <br />
                  {showGetSalary && (
                    <div className="worker worker_attend">
                      <table>
                        <thead>
                          <tr>
                            <th>Тури:</th>
                            <th>Қиймати:</th>
                            <th>Сум/Доллар:</th>
                            <th>Изох:</th>
                            <th>Берилган Вақти:</th>
                          </tr>
                        </thead>
                        <tbody>
                          {item?.salaries?.map((salary, index) => {
                            return (
                              <tr>
                                <td>{salary.type}</td>
                                <td>{salary.money}</td>
                                <td>{salary.currency}</td>
                                <td>
                                  {salary.comment.length > 0
                                    ? salary.comment
                                    : "Изоҳсиз"}
                                </td>
                                <td>{changeFormat(salary.datetime)}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                  <br />
                </div>
                <div>
                  <h2
                    onClick={() => {
                      setShowAttended(!showAttended);
                    }}
                    className="worker_title_h2"
                  >
                    ДАВОМАТИ:{" "}
                    <span>
                      {showAttended ? <FaAnglesUp /> : <FaAnglesDown />}
                    </span>
                  </h2>{" "}
                  <br />
                  {showAttended && (
                    <div className="worker worker_attend">
                      <table>
                        <thead>
                          <tr>
                            <th>Кунлар:</th>
                            <th>Келган вақти:</th>
                            <th>Кетган вақти:</th>
                          </tr>
                        </thead>
                        <tbody>
                          {item?.attendances?.map((attend, index) => {
                            return (
                              <tr>
                                <td>{attend.date}</td>
                                <td>{changeFormat(attend.came_datetime)}</td>
                                <td>{changeFormat(attend.went_datetime)}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                      <h2>Жами: {item?.attendances?.length} кун</h2>
                    </div>
                  )}
                  <br />
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Worker;
