import React from "react";
import { render } from "react-dom";
import aImg from "./杰尼龟.jpg";

import "./index.less";

const App = () => (
  <div className="app">
    This is App11113333
    <img alt="杰尼龟" src={aImg} />
  </div>
);

render(<App />, document.getElementById("root"));
