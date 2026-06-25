import { createBrowserRouter, RouteObject } from "react-router-dom";
import App from "./App.tsx";
import StoryPage from "./components/StoryPage.tsx";
import Layout from "./components/Layout.tsx";

const routes: RouteObject[] = [
    {
        element: <Layout />,
        children: [
            { path: "/", element: <App /> },
            { path: ":id", element: <StoryPage /> },
            { path: "/404", element: <div className="loading-text">404 — Page not found</div> },
        ],
    },
]

const router = createBrowserRouter(routes);

export default router;
