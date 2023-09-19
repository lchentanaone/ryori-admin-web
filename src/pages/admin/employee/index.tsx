import React from "react";
import type { NextPage } from "next";
import EmployeeTable from "@/components/Drawer/component/employee";
const EmployeePage: NextPage = () => {
  return (
    <div>
      <EmployeeTable />
    </div>
  );
};

export default EmployeePage;
