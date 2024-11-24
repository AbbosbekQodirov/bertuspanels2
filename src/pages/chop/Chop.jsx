import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { getToken } from "../../service/token";
import { baseUrl } from "../../config";
import "./Chop.css";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

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

  const pdfWidth = 210; // A4 kengligi millimetrda
  const pdfHeight = 297; // A4 balandligi millimetrda

  const handleDownloadPDF = () => {
    const input = document.getElementById("pdf-content");

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4"); // A4 format

      const pdfWidth = 210; // A4 kengligi (mm)
      const pdfHeight = 297; // A4 balandligi (mm)
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;

      let heightLeft = imgHeight; // Rasm balandligi
      let position = 0;

      // Birinchi sahifani qo'shish
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      // Agar rasm balandligi PDF sahifasidan oshsa, yangi sahifa qo'shamiz
      while (heightLeft > 0) {
        position -= pdfHeight; // Yangi sahifaga o'tish
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      pdf.save("sahifa.pdf");
    });
  };

  console.log(allData);

  return (
    <div id="pdf-content" className="container" style={{ padding: "20px" }}>
      {allData && (
        <>
          <h2>Маълумотлар Жадвали</h2>
          <table
            id="table-to-export"
            border="1"
            style={{ borderCollapse: "collapse", width: "100%" }}
          >
            <thead>
              <tr className="inComeTr">
                <th colSpan={5}>
                  <h1>Кирим</h1>
                </th>
              </tr>
              <tr className="titleTr">
                <th colSpan={5}>
                  {" "}
                  <h2>Сандвич</h2>
                </th>
              </tr>
              <tr className="titleTr">
                <th>No</th>
                <th>Исми </th>
                <th>Махсулот </th>
                <th>Ўзбекистон сўми</th>
                <th>Доллар</th>
              </tr>
            </thead>
            <tbody>
              {allData?.incomes?.filter((item) => item.type === "sandwich")
                .length > 0 ? (
                allData?.incomes
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
                  })
              ) : (
                <tr>
                  <td>0</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              )}
            </tbody>
            <thead>
              <tr className="titleTr">
                <th colSpan={5}>
                  {" "}
                  <h2>Пенопласт</h2>
                  <h2></h2>
                </th>
              </tr>
            </thead>
            <tbody>
              {allData?.incomes?.filter((item) => item.type === "pena").length >
              0 ? (
                allData?.incomes
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
                  })
              ) : (
                <tr>
                  <td>0</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              )}
            </tbody>
            <thead>
              <tr className="titleTr">
                <th colSpan={5}>
                  <h2>Бошқа</h2>
                </th>
              </tr>
            </thead>
            <tbody>
              {allData?.incomes?.filter((item) => item.type === "other")
                .length > 0 ? (
                allData?.incomes
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
                  })
              ) : (
                <tr>
                  <td>0</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              )}
              {/* <tr>
                <th colSpan={3}>Hammasi:</th>
                <th>{allData?.finally_sum_incomes} сум</th>
                <th>{allData?.finally_dollar_incomes} $</th>
              </tr> */}
            </tbody>

            <thead>
              <tr className="outComeTr">
                <th colSpan={5}>
                  <h1>ЧИҚИМ</h1>
                </th>
              </tr>

              <tr className="titleTr">
                <th>No</th>
                <th>Мижоз Исми </th>
                <th>Изох </th>
                <th>Ўзбекистон сўми</th>
                <th>Dollar</th>
              </tr>
              <tr className="titleTr">
                <th colSpan={5}>
                  <h2>Aванс учун</h2>
                </th>
              </tr>
            </thead>
            <tbody>
              {allData?.salaries.length > 0 ? (
                allData?.salaries.map((item, index) => {
                  return (
                    <tr>
                      <td>{(index += 1)}</td>
                      <td>{item.worker_name}</td>
                      <td>{item.comment}</td>
                      <td>{item.currency == "sum" ? item.amount : 0} сум</td>
                      <td>{item.currency == "dollar" ? item.amount : 0} $</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td>0</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              )}
              {/* <tr>
                <th colSpan={3}>Hammasi:</th>
                <th>{allData?.total_money_sum_advance_salaries} сум</th>
                <th>{allData?.total_money_dollar_advance_salaries} $</th>
              </tr> */}
            </tbody>
            <thead>
              <tr className="titleTr">
                <th colSpan={5}>
                  <h2>Доимий харажатлар</h2>
                </th>
              </tr>
            </thead>
            <tbody>
              {allData?.expenses?.filter((item) => item.type === "usual")
                .length > 0 ? (
                allData?.expenses
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
                  })
              ) : (
                <tr>
                  <td>0</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              )}

              {/* <tr>
                <th colSpan={3}>Hammasi:</th>
                <th>{allData?.total_money_sum_usual_expenses} сум</th>
                <th>{allData?.total_money_dollar_usual_expenses} $</th>
              </tr> */}
            </tbody>
            <thead>
              <tr className="titleTr">
                <th colSpan={5}>
                  <h2>Йўл хақи учун харажатлар</h2>
                </th>
              </tr>
            </thead>
            <tbody>
              {allData?.expenses?.filter((item) => item.type === "toll")
                .length > 0 ? (
                allData?.expenses
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
                  })
              ) : (
                <tr>
                  <td>0</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              )}

              {/* <tr>
                <th colSpan={3}>Hammasi:</th>
                <th>{allData?.total_money_sum_toll_expenses} сум</th>
                <th>{allData?.total_money_dollar_toll_expenses} $</th>
              </tr> */}
            </tbody>

            <thead>
              <tr className="titleTr">
                <th colSpan={5}>
                  <h2>Завод озиқ овқати учун </h2>
                </th>
              </tr>
            </thead>
            <tbody>
              {allData?.expenses?.filter((item) => item.type === "food")
                .length > 0 ? (
                allData?.expenses
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
                  })
              ) : (
                <tr>
                  <td>0</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              )}

              {/* <tr>
                <th colSpan={3}>Hammasi:</th>
                <th>{allData?.total_money_sum_food_expenses} сум</th>
                <th>{allData?.total_money_dollar_food_expenses} $</th>
              </tr> */}
            </tbody>
            <thead>
              <tr className="titleTr">
                <th colSpan={5}>
                  <h2>Ташқи харажатлар учун </h2>
                </th>
              </tr>
            </thead>
            <tbody>
              {allData?.expenses?.filter((item) => item.type === "other")
                .length > 0 ? (
                allData?.expenses
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
                  })
              ) : (
                <tr>
                  <td>0</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              )}

              {/* <tr>
                <th colSpan={3}>Hammasi:</th>
                <th>{allData?.total_money_sum_other_expenses} сум</th>
                <th>{allData?.total_money_dollar_other_expenses} $</th>
              </tr> */}
            </tbody>
            <thead>
              <tr className="inComeTr">
                <th colSpan={3}>
                  <h2>Жами Кирим</h2>
                </th>
                <th>
                  <h2>{allData?.finally_sum_incomes} сум</h2>
                </th>
                <th>
                  <h2>{allData?.finally_dollar_incomes} $</h2>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="text_right">
                <td colSpan={3}>Sendwich:</td>
                <td>
                  {allData.total_money_sum_sandwich_incomes
                    ? allData.total_money_sum_sandwich_incomes
                    : "0"}{" "}
                  сум
                </td>
                <td>
                  {allData.total_money_dollar_sandwich_incomes
                    ? allData.total_money_dollar_sandwich_incomes
                    : "0"}{" "}
                  $
                </td>
              </tr>
              <tr className="text_right">
                <td colSpan={3}>Пенопласт:</td>
                <td>
                  {allData.total_money_sum_pena_incomes
                    ? allData.total_money_sum_pena_incomes
                    : "0"}{" "}
                  сум
                </td>
                <td>
                  {allData.total_money_dollar_pena_incomes
                    ? allData.total_money_dollar_pena_incomes
                    : "0"}{" "}
                  $
                </td>
              </tr>
              <tr className="text_right">
                <td colSpan={3}>Бошқа:</td>
                <td>
                  {allData.total_money_sum_other_incomes
                    ? allData.total_money_sum_other_incomes
                    : "0"}{" "}
                  сум
                </td>
                <td>
                  {allData.total_money_dollar_other_incomes
                    ? allData.total_money_dollar_other_incomes
                    : "0"}{" "}
                  $
                </td>
              </tr>
            </tbody>
            <thead>
              <tr className="outComeTr">
                <th colSpan={3}>
                  <h2>Жами Чиқим</h2>
                </th>
                <th>
                  <h2>{allData?.finally_sum_expenses} сум</h2>
                </th>
                <th>
                  <h2>{allData?.finally_dollar_expenses} $</h2>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text_right" colSpan={3}>
                  Aванс учун Чиқим
                </td>
                <td className="text_right">
                  {allData?.finally_sum_salaries} сум
                </td>
                <td className="text_right">
                  {allData?.finally_dollar_salaries} $
                </td>
              </tr>
              <tr>
                <td className="text_right" colSpan={3}>
                  Доимий Ҳаражатлар учун Чиқим
                </td>
                <td className="text_right">
                  {allData?.total_money_sum_usual_expenses} сум
                </td>
                <td className="text_right">
                  {allData?.total_money_dollar_usual_expenses} $
                </td>
              </tr>
              <tr>
                <td className="text_right" colSpan={3}>
                  Йўл ҳаққи учун
                </td>
                <td className="text_right">
                  {allData?.total_money_sum_toll_expenses} сум
                </td>
                <td className="text_right">
                  {allData?.total_money_dollar_toll_expenses} $
                </td>
              </tr>
              <tr>
                <td className="text_right" colSpan={3}>
                  Озиқ овқат учун
                </td>
                <td className="text_right">
                  {allData?.total_money_sum_food_expenses} сум
                </td>
                <td className="text_right">
                  {allData?.total_money_dollar_food_expenses} $
                </td>
              </tr>
              <tr>
                <td className="text_right" colSpan={3}>
                  Ташқи Ҳаражатлатар учун
                </td>
                <td className="text_right">
                  {allData?.total_money_sum_other_expenses} сум
                </td>
                <td className="text_right">
                  {allData?.total_money_dollar_other_expenses} $
                </td>
              </tr>

              <tr className="titleTr">
                <td className="text_left" colSpan={3}>
                  <h3>Касса топширди</h3>
                </td>
                <td className="text_right">
                  {allData?.finally_sum_benefit} сум
                </td>
                <td className="text_right">
                  {allData?.finally_dollar_benefit} $
                </td>
              </tr>
            </tbody>
          </table>
          <button
            onClick={handleDownloadPDF}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            pdf файлни юклаш
          </button>
        </>
      )}
    </div>
  );
};

export default Chop;
