import { useState } from "react";
// import "./App.css";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <div>
      <div className="flex flex-col">
        <Navbar />
        {/* <div className="flex h-fit">
          <SideBar />
          <Content />
        </div> */}
      </div>
    </div>
  );
}

export default App;
