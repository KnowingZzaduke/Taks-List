import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { TaskContextProvider } from './context/TaskContext';
import "./scss/app.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
    <TaskContextProvider>
      <App/>
    </TaskContextProvider>
);
