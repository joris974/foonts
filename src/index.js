import React from "react";
import { createRoot } from "react-dom/client";
import { AppRouter } from "./routers/router";

const rootElement = document.getElementById("root");

if (rootElement) {
	createRoot(rootElement).render(React.createElement(AppRouter));
}
