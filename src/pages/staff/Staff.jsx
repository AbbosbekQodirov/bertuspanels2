import React, { useEffect, useState } from "react";
import "./Staff.css";
import { Link } from "react-router-dom";
import AddWorker from "../../components/addworker/AddWorker";
import { baseUrl } from "../../config";
import { getRole, getToken } from "../../service/token";
import UpdateWorker from "../../components/updateworker/UpdateWorker";
import SetLoans from "../../components/setloans/SetLoans";
import GiveSalary from "../../components/givesalary/GiveSalary";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import FileInput from "../../components/importFile/FileInput";

function Staff() {
  const [workers, setWorkers] = useState(null);
  const [showAddWorker, setShowAddWorker] = useState(false);
  const [showUpdateWorker, setShowUpdateWorker] = useState(false);
  const [showLoans, setShowLoans] = useState(false);
  const [showGiveSalary, setShowGiveSalary] = useState(false);


  const [changedData, setChangedData] = useState(false);

  const [workerId, setWorkerId] = useState(0);

  const [part, setPart] = useState(null);

  const [searchName, setSearchName] = useState("");

  const getWorkers = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getToken()}`);
    myHeaders.append("Access-Control-Allow-Origin", "*");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `${baseUrl}/workers/get?search=${searchName}${
        part ? "&part=" + part : ""
      }`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {

        setWorkers(result.data);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getWorkers();
  }, [changedData, part, searchName]);

  const [file, setFile] = useState(null); // Faylni saqlash uchun state

  const handleSubmit = async (event) => {
    event.preventDefault(); // Forma jo'natishdan to'xtatish

    if (!file) {
      alert("Илтимос, файл танланг!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file); // Backendda 'file' nomli key qabul qilinadi

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getToken()}`);
    myHeaders.append("Access-Control-Allow-Origin", "*");
    try {
      const response = await fetch(
        "https://iteachpython.uz/attendances/import-attendance/",
        {
          method: "POST",
          body: formData,
          headers: myHeaders,
        }
      );

      if (response.ok) {
        const data = await response.json();
        toast.success("Файл муваффақиятли юкланди!");
      } else {
        console.error("Хато:", response.status, response.statusText);
        toast.error(
          "Файлни юклашда хато юз берди бу санадаги давомат юкланган бўлиши мумкун!"
        );
      }
    } catch (error) {
      toast.error("Серверга уланишда хато юз берди.");
      console.error("Серверга уланишда хато юз берди", error);
    }
  };

  const downloadExcel = (data) => {
    var aboutWorker = [];
    data.forEach((item) => {
      var obj = {
        Ismi: item.name,
        "Ish kuni": item.workdays,
        Balansi: item.balance,
        Fiksa: item.fixed,
        "Bo'lim": item.part,
        "Olingan pullar": item.salaries.reduce(
          (total, i) => total + (i.money || 0),
          0
        ),
        qarzlar: item.loans[0]?.total ? item.loans[0]?.total : "",
        "Ishlagan kuni": item.attendances.length,
      };
      aboutWorker.push(obj);
      aboutWorker.push([]);
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

  return (
    <div className="staff">
      {showAddWorker && (
        <AddWorker
          changedData={changedData}
          setChangedData={setChangedData}
          setShowAddWorker={setShowAddWorker}
        />
      )}
      <div className="container">
        <nav>
          <div className="mainLogo">
            <Link to={"/"}>
              <img src="/imgs/mainlogo.png" alt="" />
            </Link>
          </div>
          <ul className="mainLinks">
            {/* <li>
              <button
                onClick={() => {
                  setShowAddWorker(true);
                }}
                className="btn"
              >
                Hodim qo’shish <img src="/imgs/plus.svg" alt="" />{" "}
              </button>
            </li> */}
            <li>
              <FileInput
                file={file}
                setFile={setFile}
                handleSubmit={handleSubmit}
              />
              {/* <form className="attendForm" onSubmit={handleSubmit}>
                <label htmlFor="attendInput">
                  <input
                    id="attendInput"
                    className="attendInput"
                    type="file"
                    onChange={handleFileChange}
                  />
                </label>
                <button disabled={file == null ? true : false} type="submit">
                  Yuborish
                </button>
              </form> */}
              {/* <form action="">
                <label htmlFor="attended">
                  Davomatni yuklash
                  <input
                    onChange={(e) => {
                      console.log(e.target.value);
                    }}
                    className="attendInput"
                    id="attended"
                    type="file"
                    placeholder="Davomatni yuklash"
                  />
                </label>
                <button>Jo'natish</button>
              </form> */}
            </li>
            <li>
              <label>
                <input
                  onChange={(e) => {
                    setSearchName(e.target.value);
                  }}
                  type="text"
                  placeholder="Қидирув"
                />{" "}
                <img src="/imgs/search.svg" alt="" />{" "}
              </label>
            </li>

            <li
              onClick={() => {
                downloadExcel(workers);
              }}
            >
              <button>
                Чоп етиш <img src="/imgs/print.svg" alt="" />{" "}
              </button>
            </li>
          </ul>
        </nav>
        <div className="controll">
          <button
            disabled={getRole() == "watcher" ? true : false}
            onClick={() => {
              setShowAddWorker(true);
            }}
            className="btn"
          >
            Ҳодим қўшиш
            <img src="/imgs/plus.svg" alt="" />{" "}
          </button>
          {/* <button className=" controllBtn btn">
            Qo’shish <img src="/imgs/plus.svg" alt="" />{" "}
          </button> */}
          <button
            onClick={() => {
              setPart("");
            }}
            className={part == "" ? "controllBtn active" : "controllBtn"}
          >
            Ҳаммаси
          </button>
          <button
            onClick={() => {
              setPart("office");
            }}
            className={part == "office" ? "controllBtn active" : "controllBtn"}
          >
            Офис{" "}
          </button>
          <button
            onClick={() => {
              setPart("sandwich");
            }}
            className={
              part == "sandwich" ? "controllBtn active" : "controllBtn"
            }
          >
            Сендвич
          </button>
          <button
            onClick={() => {
              setPart("peno_cutting");
            }}
            className={
              part == "peno_cutting" ? "controllBtn active" : "controllBtn"
            }
          >
            Пенопласт кесиш{" "}
          </button>
          <button
            onClick={() => {
              setPart("peno_making");
            }}
            className={
              part == "peno_making" ? "controllBtn active" : "controllBtn"
            }
          >
            Пенопласт ясаш
          </button>
          <button
            onClick={() => {
              setPart("other");
            }}
            className={part == "other" ? "controllBtn active" : "controllBtn"}
          >
            Бошқа
          </button>
        </div>

        <div className="workers">
          {workers?.map((item, index) => {

            return (
              <div className="worker">
                <div className="worker_info">
                  <button className="workerId">{index + 1}</button>
                  <div>
                    <p>ФИШ:</p>
                    <p>{item.name}</p>
                  </div>
                </div>
                <div className="worker_info">
                  <div>
                    <p>Иш куни:</p>
                    <p>{item.workdays} кун</p>
                  </div>
                </div>
                <div className="worker_info">
                  <div>
                    <p>Фикса маоши: </p>
                    <p>
                      {" "}
                      {item.fixed
                        ?.toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
                      сўм
                    </p>
                  </div>
                </div>

                <div className="worker_info">
                  <div>
                    <p>Баланси:</p>
                    <p>
                      {item.balance
                        ?.toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
                      
                    </p>
                  </div>
                </div>

                <div className="worker_info">
                  <Link to={`/worker/${item.id}`}>Батафсил</Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Staff;
