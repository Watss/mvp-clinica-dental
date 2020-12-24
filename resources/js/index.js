import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
require('./bootstrap');



if (document.getElementById("root")) {
    ReactDOM.render(
        <BrowserRouter>
            <App />
        </BrowserRouter>,
        document.getElementById("root")
    );
    reportWebVitals();
}
