import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Axios from "axios";
import ImageScoring from "./ImageScoring";

function App() {
  return (
    <div>
      <h1>React App</h1>
      <ImageScoring />
    </div>
  );
}

export default App;
