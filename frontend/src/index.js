// 1. React & createRoot from the correct package
import React from "react";
import { createRoot } from "react-dom/client";

// 2. Global styles (index.css must come before App.css if you’re overriding anything)
import "./index.css";
import "./App.css";

// 3. Your top-level App component
import App from "./App";

// 4. Mount point & rendering
const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
