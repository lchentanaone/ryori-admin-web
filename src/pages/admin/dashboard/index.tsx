import React from "react";
import type { NextPage } from "next";
import Dashboard from "@/components/Drawer/component/dashboard";
import TemporaryDrawer from "@/components/Drawer/Drawer";
import PermanentDrawerLeft from "@/components/Drawer/component/drawer2/draw";

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
