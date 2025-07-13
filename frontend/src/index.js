import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// Google Fonts preload
const link1 = document.createElement("link");
link1.rel = "preconnect";
link1.href = "https://fonts.googleapis.com";
document.head.appendChild(link1);

const link2 = document.createElement("link");
link2.rel = "preconnect";
link2.href = "https://fonts.gstatic.com";
link2.crossOrigin = "";
document.head.appendChild(link2);

const link3 = document.createElement("link");
link3.href =
  "https://fonts.googleapis.com/css2?family=League+Spartan:wght@400;600;700&family=Oswald:wght@400;500;600;700&family=Saira:wght@400;600&display=swap";
link3.rel = "stylesheet";
document.head.appendChild(link3);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);