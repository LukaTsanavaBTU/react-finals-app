import { Link, Outlet } from "react-router-dom";
import LolLogo from "./assets/images/lol-logo.png";
import BackgroundImage from "./assets/images/background.jpg";

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
            <Link to="/favorites">Favorites</Link>
          </ul>
        </nav>
      </header>
      <main className="flex-1 bg-light relative flex flex-col min-h-0">
        <div
          style={{ backgroundImage: `url(${BackgroundImage})` }}
          className="absolute inset-0 h-full w-full bg-cover bg-center bg-no-repeat opacity-10 z-0"
        ></div>
        <div className="z-10 relative flex flex-col p-4 items-center flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
