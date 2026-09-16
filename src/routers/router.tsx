import { Navigate } from "react-router";
import App from "../components/app/app";
import GeneratePage from "../components/pages/generate-page";
import ExploreRecentPage from "../components/pages/explore-page/explore-recent-handler";
import ExplorePopularPage from "../components/pages/explore-page/explore-popular-handler";
import FontsPage from "../components/pages/fonts-page";

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Navigate replace to="generate" /> },
      { path: "generate/:fonts?", element: <GeneratePage /> },
      {
        path: "explore",
        children: [
          { path: "recent", Component: ExploreRecentPage },
          { path: "popular", Component: ExplorePopularPage },
        ],
      },
      { path: "fonts", element: <FontsPage /> },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
