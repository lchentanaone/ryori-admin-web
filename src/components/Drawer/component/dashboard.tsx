import React from "react";
import style from "./style.module.css";

const Dashboard = () => {
  return (
    <div className={style.container}>
      <h1>Dashboard</h1>
      <div className={style.dashInfo}>
        <table>
          <thead>
            <tr>
              <th>Total Menus</th>
              <th>Total Orders</th>
              <th>Total Customers</th>
              <th>Total Revenues</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>16</td>
              <td>1875</td>
              <td>987,997</td>
              <td>115,687.82</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={style.sum_rev}>
        <div className={style.dashBox}>
          <div className={style.flex_row}>
            <h4>Order Summary</h4>
            <div className={style.filter}>
              <div>Monthly</div> |<div>Weekly</div> |<div>Today</div>
            </div>
          </div>
          <div className={`${style.flex_row} ${style.mt} `}>
            <div className={`${style.summaryInfo} ${style.new}`}>
              <h3>{"99"}</h3>
              <div>new</div>
            </div>
            <div className={`${style.summaryInfo} ${style.preparing}`}>
              <h3>{"99"}</h3>
              <div>Preparing</div>
            </div>
            <div className={`${style.summaryInfo} ${style.served}`}>
              <h3>{"99"}</h3>
              <div>Served</div>
            </div>
          </div>
          <div className={`${style.flex_row} ${style.mt} `}>
            <div className={`${style.summaryInfo} ${style.waiting_payment}`}>
              <h3>{"99"}</h3>
              <div>Waiting for Payment</div>
            </div>
            <div className={`${style.summaryInfo} ${style.done}`}>
              <h3>{"99"}</h3>
              <div>Done</div>
            </div>
            <div className={`${style.summaryInfo} ${style.cancelled}`}>
              <h3>{"99"}</h3>
              <div>Cancelled</div>
            </div>
          </div>
        </div>
        <div className={style.dashBox}>
          <h4>Consumption</h4>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
