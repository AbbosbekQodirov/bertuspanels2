import React from "react";
import "./DetailTable.css";
import { toast } from "react-toastify";
function DetailTable({ data, setShowAdd }) {
  return (
    <div className="detailTable">
      <div className="container">
        <table>
          <thead>
            <tr>
              <th>Но</th>
              <th>Маҳсулот</th>
              <th>Ўзбек сўми</th>
              <th>Долларда</th>
              <th>Қўшимча маълумот</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{item.type}</td>
                  <td>{item.currency == "sum" ? item.money : 0} УЗС</td>
                  <td>{item.currency == "dollar" ? item.money : 0}$</td>
                  <td>{item.comment}</td>
                  <td></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DetailTable;
