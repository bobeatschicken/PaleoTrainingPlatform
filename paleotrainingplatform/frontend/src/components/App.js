import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Axios from "axios";
import ImageScoring from "./ImageScoring";
import References from "./References";
import SplitterLayout from "react-splitter-layout";
import "react-splitter-layout/lib/index.css";

function App() {
  return (
    <SplitterLayout percentage secondaryInitialSize={25} secondaryMinSize={25}>
      <div className="my-pane">
        <ImageScoring />
      </div>
      <div className="my-pane">
        <References />
      </div>
    </SplitterLayout>
  );
}

export default App;
