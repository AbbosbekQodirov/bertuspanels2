import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { getToken } from "../../service/token";
import { baseUrl } from "../../config";

const Chop = () => {

    const getCurrentDate = () => {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, "0"); // Oylarni 0-dan boshlab hisoblaydi
      const day = String(today.getDate()).padStart(2, "0"); // Kunni 2 xonali formatga keltiradi
      return `${year}-${month}-${day}`;
    };

  const [allData, setAllData] = useState(null);
  // Excel faylga eksport qilish funksiyasi
  const exportToExcel = () => {
    const table = document.getElementById("table-to-export"); // Jadvalni olish
    const workbook = XLSX.utils.table_to_book(table, { raw: true }); // Jadvalni Excelga aylantirish
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "jadval.xlsx"); // Foydalanuvchiga yuklash
  };

  const getAllData = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getToken()} `);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `${baseUrl}/daily_data/all-data/?current_date=${getCurrentDate()}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setAllData(result))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getAllData();
  }, []);

console.log(allData);

  

  return (
    <div className="container" style={{ padding: "20px" }}>
      {allData && (
        <>
          <h2>Ma'lumotlar Jadvali</h2>
          <table
            id="table-to-export"
            border="1"
            style={{ borderCollapse: "collapse", width: "100%" }}
          >
            <thead>
              <tr>
                <th colSpan={5}>
                  <h1>Kirim</h1>
                </th>
              </tr>
              <tr>
                <th colSpan={5}>
                  {" "}
                  <h2>Sandvich</h2>
                </th>
              </tr>
              <tr>
                <th>No</th>
                <th>Ismi</th>
                <th>Maxsulot</th>
                <th>O'zbekiston so'mi</th>
                <th>Dollar</th>
              </tr>
            </thead>
            <tbody>
              {allData?.incomes
                ?.filter((item) => item.type === "sandwich")
                .map((item, index) => {
                  return (
                    <tr>
                      <td>{(index += 1)}</td>
                      <td>{item.name}</td>
                      <td>{item.type}</td>
                      <td>{item.currency == "sum" ? item.amount : 0} сум</td>
                      <td>{item.currency == "dollar" ? item.amount : 0} $</td>
                    </tr>
                  );
                })}
            </tbody>
            <thead>
              <tr>
                <th colSpan={5}>
                  {" "}
                  <h2>Penoplast</h2>
                  <h2></h2>
                </th>
              </tr>
            </thead>
            <tbody>
              {allData?.incomes
                ?.filter((item) => item.type === "pena")
                .map((item, index) => {
                  return (
                    <tr>
                      <td>{(index += 1)}</td>
                      <td>{item.name}</td>
                      <td>{item.type}</td>
                      <td>{item.currency == "sum" ? item.amount : 0} сум</td>
                      <td>{item.currency == "dollar" ? item.amount : 0} $</td>
                    </tr>
                  );
                })}
            </tbody>
            <thead>
              <tr>
                <th colSpan={5}>
                  <h2>Boshqa</h2>
                </th>
              </tr>
            </thead>
            <tbody>
              {allData?.incomes
                ?.filter((item) => item.type === "other")
                .map((item, index) => {
                  return (
                    <tr>
                      <td>{(index += 1)}</td>
                      <td>{item.name}</td>
                      <td>{item.type}</td>
                      <td>{item.currency == "sum" ? item.amount : 0} сум</td>
                      <td>{item.currency == "dollar" ? item.amount : 0} $</td>
                    </tr>
                  );
                })}
              <tr>
                <th colSpan={3}>Hammasi:</th>
                <th>{allData?.finally_sum_incomes} сум</th>
                <th>{allData?.finally_dollar_incomes} $</th>
              </tr>
            </tbody>

            <thead>
              <tr>
                <th colSpan={5}>
                  <h1>CHIQIM</h1>
                </th>
              </tr>
              <tr>
                <th colSpan={5}>
                  <h2>Avans uchun</h2>
                </th>
              </tr>
              <tr>
                <th>No</th>
                <th>Mijoz ismi</th>
                <th>Izox</th>
                <th>O'zbekiston so'mi</th>
                <th>Dollar</th>
              </tr>
            </thead>
            <tbody>
              {allData?.salaries?.map((item, index) => {
                return (
                  <tr>
                    <td>{(index += 1)}</td>
                    <td>{item.worker_name}</td>
                    <td>{item.comment}</td>
                    <td>{item.currency == "sum" ? item.amount : 0} сум</td>
                    <td>{item.currency == "dollar" ? item.amount : 0} $</td>
                  </tr>
                );
              })}
              <tr>
                <th colSpan={3}>Hammasi:</th>
                <th>{allData?.total_money_sum_advance_salaries} сум</th>
                <th>{allData?.total_money_dollar_advance_salaries} $</th>
              </tr>
            </tbody>
            <thead>
              <tr>
                <th colSpan={5}>
                  <h2>Doimiy xarajatlar</h2>
                </th>
              </tr>
              <tr>
                <th>No</th>
                <th>Mijoz ismi</th>
                <th>Izox</th>
                <th>O'zbekiston so'mi</th>
                <th>Dollar</th>
              </tr>
            </thead>
            <tbody>
              {allData?.expenses
                ?.filter((item) => item.type === "usual")
                .map((item, index) => {
                  return (
                    <tr>
                      <td>{(index += 1)}</td>
                      <td>{item.name}</td>
                      <td>{item.comment}</td>
                      <td>{item.currency == "sum" ? item.amount : 0} сум</td>
                      <td>{item.currency == "dollar" ? item.amount : 0} $</td>
                    </tr>
                  );
                })}

              <tr>
                <th colSpan={3}>Hammasi:</th>
                <th>{allData?.total_money_sum_usual_expenses} сум</th>
                <th>{allData?.total_money_dollar_usual_expenses} $</th>
              </tr>
            </tbody>
            <thead>
              <tr>
                <th colSpan={5}>
                  <h2>Yo'l xaqi uchun xarajatlar</h2>
                </th>
              </tr>
            </thead>
            <tbody>
              {allData?.expenses
                ?.filter((item) => item.type === "toll")
                .map((item, index) => {
                  return (
                    <tr>
                      <td>{(index += 1)}</td>
                      <td>{item.name}</td>
                      <td>{item.comment}</td>
                      <td>{item.currency == "sum" ? item.amount : 0} сум</td>
                      <td>{item.currency == "dollar" ? item.amount : 0} $</td>
                    </tr>
                  );
                })}

              <tr>
                <th colSpan={3}>Hammasi:</th>
                <th>{allData?.total_money_sum_toll_expenses} сум</th>
                <th>{allData?.total_money_dollar_toll_expenses} $</th>
              </tr>
            </tbody>

            <thead>
              <tr>
                <th colSpan={5}>
                  <h2>Zavod oziq ovqati uchun </h2>
                </th>
              </tr>
            </thead>
            <tbody>
              {allData?.expenses
                ?.filter((item) => item.type === "food")
                .map((item, index) => {
                  return (
                    <tr>
                      <td>{(index += 1)}</td>
                      <td>{item.name}</td>
                      <td>{item.comment}</td>
                      <td>{item.currency == "sum" ? item.amount : 0} сум</td>
                      <td>{item.currency == "dollar" ? item.amount : 0} $</td>
                    </tr>
                  );
                })}

              <tr>
                <th colSpan={3}>Hammasi:</th>
                <th>{allData?.total_money_sum_food_expenses} сум</th>
                <th>{allData?.total_money_dollar_food_expenses} $</th>
              </tr>
            </tbody>
            <thead>
              <tr>
                <th colSpan={5}>
                  <h2>Tashqi xarajatlar uchun </h2>
                </th>
              </tr>
            </thead>
            <tbody>
              {allData?.expenses
                ?.filter((item) => item.type === "other")
                .map((item, index) => {
                  return (
                    <tr>
                      <td>{(index += 1)}</td>
                      <td>{item.name}</td>
                      <td>{item.comment}</td>
                      <td>{item.currency == "sum" ? item.amount : 0} сум</td>
                      <td>{item.currency == "dollar" ? item.amount : 0} $</td>
                    </tr>
                  );
                })}

              <tr>
                <th colSpan={3}>Hammasi:</th>
                <th>{allData?.total_money_sum_other_expenses} сум</th>
                <th>{allData?.total_money_dollar_other_expenses} $</th>
              </tr>
            </tbody>
            <thead>
              <tr>
                <th colSpan={5}>
                  <h2>Jami kirim</h2>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th colSpan={3}>Hammasi:</th>
                <th>{allData?.finally_sum_incomes} сум</th>
                <th>{allData?.finally_dollar_incomes} $</th>
              </tr>
            </tbody>
            <thead>
              <tr>
                <th colSpan={5}>
                  <h2>Jami Chiqim</h2>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={3}>Avans uchun chiqim</td>
                <td>{allData?.finally_sum_salaries} сум</td>
                <td>{allData?.finally_dollar_salaries} $</td>
              </tr>
              <tr>
                <td colSpan={3}>Doimiy Harajatlar uchun chiqim</td>
                <td>{allData?.total_money_sum_usual_expenses} сум</td>
                <td>{allData?.total_money_dollar_usual_expenses} $</td>
              </tr>
              <tr>
                <td colSpan={3}>Yo'l haqqi uchun</td>
                <td>{allData?.total_money_sum_toll_expenses} сум</td>
                <td>{allData?.total_money_dollar_toll_expenses} $</td>
              </tr>
              <tr>
                <td colSpan={3}>Oziq ovqat uchun</td>
                <td>{allData?.total_money_sum_food_expenses} сум</td>
                <td>{allData?.total_money_dollar_food_expenses} $</td>
              </tr>
              <tr>
                <td colSpan={3}>Tashqi Harajatlatar uchun</td>
                <td>{allData?.total_money_sum_other_expenses} сум</td>
                <td>{allData?.total_money_dollar_other_expenses} $</td>
              </tr>
            </tbody>
          </table>
          <button
            onClick={exportToExcel}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Excel Faylga Yuklash
          </button>
        </>
      )}
    </div>
  );
};

export default Chop;
