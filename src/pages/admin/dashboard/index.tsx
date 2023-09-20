import React from "react";
import type { NextPage } from "next";
import Dashboard from "@/components/Drawer/component/dashboard";
import TemporaryDrawer from "@/components/Drawer/Drawer";

const DashboardPage: NextPage = () => {
  return (
    <>
      <TemporaryDrawer />
      {/* <PermanentDrawerLeft /> */}
      <Dashboard />
    </>
  );
};

export default DashboardPage;
