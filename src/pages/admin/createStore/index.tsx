import React from "react";
import LoginForm from "../../../components/Login/Login";
import type { NextPage } from "next";
import PermanentDrawerLeft from "@/components/Drawer/Drawer";
import CreateStore from "@/components/CreateStoreBranch/setupstore";
const SetUpStore: NextPage = () => {
  return (
    <div>
      <CreateStore />
    </div>
  );
};

export default SetUpStore;
