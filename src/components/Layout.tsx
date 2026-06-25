import { Link, Outlet } from "react-router-dom";
import "../App.css";

export default function Layout() {
    return (
        <div>
            <header className="app-header">
                <Link to="/" className="app-header__logo">Y</Link>
                <Link to="/" className="app-header__name">Hacker News</Link>
            </header>
            <main className="page-content">
                <Outlet />
            </main>
        </div>
    );
}
