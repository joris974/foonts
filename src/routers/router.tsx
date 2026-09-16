import { HashRouter, Navigate, Route, Routes } from "react-router";
import React from "react";
import App from "../components/app/app";
import GeneratePage from "../components/pages/generate-page";
import ExploreRecentPage from "../components/pages/explore-page/explore-recent-handler";
import ExplorePopularPage from "../components/pages/explore-page/explore-popular-handler";
import FontsPage from "../components/pages/fonts-page";

export function AppRouter() {
  return (
    <HashRouter>
      <App>
        <Routes>
          <Route path="/" element={<Navigate replace to="/generate" />} />
          <Route path="/generate/:fonts?" element={<GeneratePage />} />
          <Route path="/explore/recent" element={<ExploreRecentPage />} />
          <Route path="/explore/popular" element={<ExplorePopularPage />} />
          <Route path="/fonts" element={<FontsPage />} />
        </Routes>
      </App>
    </HashRouter>
  );
}
