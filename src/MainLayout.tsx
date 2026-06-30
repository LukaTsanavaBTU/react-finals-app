import { Link, Outlet } from "react-router-dom";
import LolLogo from "./assets/images/lol-logo.png";

export default function MainLayout() {
  return (
    <div className="h-screen flex flex-col">
      <header className="p-6  bg-dark flex justify-between items-center">
        <div className="flex items-center gap-4">
          <img src={LolLogo} alt="" className="w-16 h-16" />
          <h1 className="text-gold font-bold text-4xl">LoL Champion Viewer</h1>
        </div>
        <nav className="text-gold text-2xl">
          <ul className="flex gap-2 items-center underline">
            <Link to="/">Home</Link>
            <Link to="/viewer">Viewer</Link>
            <Link to="/random">Random</Link>
          </ul>
        </nav>
      </header>
      <main className="flex-1 bg-light">
        <Outlet />
      </main>
    </div>
  );
}
