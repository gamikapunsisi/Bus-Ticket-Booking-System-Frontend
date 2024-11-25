import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import { useState } from "react";

const Root = () => {

  const [expandSideBar, setExpandSideBar] = useState(true);
  const [openSideBar, setOpenSideBar] = useState(false);

  return (
    <>
      <Header openSideBar={openSideBar} setExpandSideBar={setOpenSideBar}/>
      <main>
        <div className=" flex">
          <Sidebar expandSideBar={expandSideBar} setExpandSideBar={setExpandSideBar} />
          <div className={`p-9 flex-1 pt-24 ${expandSideBar ? 'ml-64' : 'ml-20'}`}>
            <Outlet context={{ expandSideBar, setExpandSideBar, openSideBar }}/>
          </div>
        </div>
      </main>
    </>
  );
};

export default Root;
