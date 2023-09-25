import React, { useEffect, useState } from "react";
import style from "./style.module.css";

interface Store_data {
  _id: string;
  storeName: string;
}
interface Branch_data {
  _id: string;
  branchName: string;
}
interface DashboardData {
  _id: string;
  orderSummary: {
    today: {
      new: number;
      preparing: number;
      served: number;
      done: number;
      cancelled: number;
      awaiting_payment: number;
    };
    // Add other filter types here if needed
  };
  new: number;
  totalMenus: string;
  totalOrders: string;
  totalCustomers: string;
  totalRevenues: string;
}

const Dashboard = () => {
  const [storeData, setStoreData] = useState<Store_data>();
  const [branchData, setBranchData] = useState<Branch_data>();
  const [dashboard, setDashboard] = useState<DashboardData>();
  const [consumption, setConsumption] = useState(0);
  const [newOrders, setNewOrders] = useState(0);
  const [preparing, setPreparing] = useState(0);
  const [served, setServed] = useState(0);
  const [doneOrder, setDoneOrder] = useState(0);
  const [cancelled, setCancelled] = useState(0);
  const [waitingPayment, setWaitingPayment] = useState(0);

  const fetchStoreData = async () => {
    try {
      const token = localStorage.getItem("token");
      const store_Id = localStorage.getItem("store_Id");
      const branch_Id = localStorage.getItem("branch_Id");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/store/${store_Id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setStoreData(data);
      console.log({ data });
    } catch (error) {
      console.error("Error fetching store data:", error);
    }
  };
  const fetchBranchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const branch_Id = localStorage.getItem("branch_Id");
      console.log({ branch_Id });
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/branch/${branch_Id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const branch = await response.json();
      setBranchData(branch);
    } catch (error) {
      console.error("Error fetching branch data:", error);
    }
  };
  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");
      const store_Id = localStorage.getItem("store_Id");
      const branch_Id = localStorage.getItem("branch_Id");
      console.log({ branch_Id });
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/dashboard/?bid=${branch_Id}&sid=${store_Id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const dashBranch = await response.json();
      console.log({ dashBranch });
      setDashboard(dashBranch);
    } catch (error) {
      console.error("Error fetching branch data:", error);
    }
  };
  useEffect(() => {
    fetchStoreData();
    fetchBranchData();
    fetchDashboard();
  }, []);

  // useEffect(() => {
  //   dashboard && dashboard.orderSummary && changeFilter("today");
  // }, [dashboard]);

  // const changeFilter = (type: any) => {
  //   setNewOrders(dashboard && dashboard.orderSummary[type].new);
  //   setPreparing(dashboard.orderSummary[type].preparing);
  //   setServed(dashboard.orderSummary[type].served);
  //   setDoneOrder(dashboard.orderSummary[type].done);
  //   setCancelled(dashboard.orderSummary[type].cancelled);
  //   setWaitingPayment(dashboard.orderSummary[type].awaiting_payment);
  // };

  const init = async () => {
    await fetchStoreData();
    fetchBranchData();
  };

  useEffect(() => {
    init();
  }, []);

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
              <td> {dashboard && dashboard.totalMenus}</td>
              <td>{dashboard && dashboard.totalOrders}</td>
              <td>{dashboard && dashboard.totalCustomers}</td>
              <td> {dashboard && dashboard.totalRevenues}</td>
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
