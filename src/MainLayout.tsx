import { Link, Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div>
      <header>
        <p>my header</p>
        <Link to="/">Home</Link>
        <Link to="/viewer">Viewer</Link>
        <Link to="/favorites">Favorites</Link>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
