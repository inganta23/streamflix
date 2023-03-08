import React from "react";
import Content from "../components/Content/Content";
import SideBar from "../components/Sidebar/Sidebar";

const Home = () => {
  return (
    <div>
      <div className="flex flex-col mt-24">
        <div className="flex h-fit">
          <SideBar />
          <Content />
        </div>
      </div>
    </div>
  );
};

export default Home;
