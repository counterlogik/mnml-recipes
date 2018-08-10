import React from "react";
import { render } from "react-dom";
import { makeRoutes } from "./routes";
import "./css/style.css";
import registerServiceWorker from "./registerServiceWorker";

const routes = makeRoutes();

render(<div>{routes}</div>, document.querySelector("#App"));

registerServiceWorker();
