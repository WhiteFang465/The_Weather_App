import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Weathers from "./Weathers";
import Header from "./Header";
import Footer from "./Footer";
import Nav from "./Nav";

ReactDOM.render(
    <React.StrictMode>
        <Header headerName="Weather Portal" />
        <Nav />
        <Weathers />
        <Footer authorName="Atul Jairam" />
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
