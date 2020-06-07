import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import LoginPage from "./components/views/LoginPage/LoginPage";
// import LoginPage from "./components/views/LoginPage/SignIn copy 2";
// import { Provider } from "react-redux";

ReactDOM.render(
  <React.StrictMode>
    <App />
    {/* <LoginPage /> */}
  </React.StrictMode>,
  // <Provider>
  //   store={}
  //   <App />
  // </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
