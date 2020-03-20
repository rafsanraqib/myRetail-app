// Client side

import React from "react";
import TextBox from "./Components/TextBox";
import UpdatePrice from './Components/UpdatePrice';
import "./App.css";

function App() {
  return (
    <div className="container">
      <div className="container">
        <TextBox></TextBox>
      </div>
      <br></br>
      <div className = "container">
        <UpdatePrice></UpdatePrice>
      </div>
    </div>
  );
}

export default App;
