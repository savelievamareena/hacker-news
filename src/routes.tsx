import {createBrowserRouter, RouteObject} from "react-router-dom";
import App from "./App.tsx";

const routes: RouteObject[] = [
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "/:id",
                element: <div>News Page</div>
            }
        ]
    },
    {
        path: '/404',
        element: <div>404</div>,
    },
]

const router = createBrowserRouter(routes)

export default router