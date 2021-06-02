require("file-loader?name=[name].[ext]!./index.html");
import React from "react";
import ReactDOM from "react-dom";
import NoteTakingApp from "./components/NoteTakingApp";

ReactDOM.render(<NoteTakingApp />, document.getElementById("app"));
