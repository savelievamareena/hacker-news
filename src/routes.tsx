import {createBrowserRouter, RouteObject} from "react-router-dom";
import App from "./App.tsx";
import StoryPage from "./components/StoryPage.tsx";

const routes: RouteObject[] = [
    {
        path: "/",
        element: <App/>,
    },
    {
        path: ":id",
        element: <StoryPage/>
    },
    {
        path: '/404',
        element: <div>404</div>,
    },
]

const router = createBrowserRouter(routes)

export default router