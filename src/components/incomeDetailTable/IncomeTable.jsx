import React from "react";
import "./IncomeTable.css";
import { toast } from "react-toastify";
function IncomeTable({data, setShowAdd }) {
  console.log(data);
  
  return (
    <div className="detailTable">
      <div className="container">
        <table>
          <thead>
            <tr>
              <th>N</th>
              <th>Мижоз исми</th>
              <th>Маҳсулот</th>
              <th>Ўзбек сўми</th>
              <th>Долларда</th>
              <th>изоҳ</th>

              {/* <th>
                O’zgartirish yoki <br /> O’chirish
              </th> */}
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.type}</td>
                  <td>{item.currency == "sum" ? item.money : 0} УЗС</td>
                  <td>{item.currency == "dollar" ? item.money : 0}$</td>
                  <td>
                    {item.comment.length > 16
                      ? item.comment.slice(0, 16) + "..."
                      : item.comment}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default IncomeTable;
