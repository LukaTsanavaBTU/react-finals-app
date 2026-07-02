import { Link, Outlet } from "react-router-dom";
import LolLogo from "./assets/images/lol-logo.png";
import BackgroundImage from "./assets/images/background.jpg";

export default function MainLayout() {
  return (
    <div className="h-screen flex flex-col">
      <header className="bg-dark flex justify-between items-center">
        <Link
          to="/"
          className="flex items-center gap-4 p-6 transition-all duration-200 ease-in hover:brightness-120"
        >
          <img src={LolLogo} alt="" className="w-16 h-16" />
          <h1 className="text-gold font-bold text-4xl hidden lg:block">
            LoL Champion Viewer
          </h1>
        </Link>
        <nav className="text-gold text-2xl h-full mr-2">
          <ul className="flex items-center font-bold h-full">
            <Link
              to="/viewer"
              className="p-2 h-full flex items-center transition-all duration-200 ease-in hover:bg-gold hover:text-dark"
            >
              Viewer
            </Link>
            <Link
              to="/favorites"
              className="p-2 h-full flex items-center transition-all duration-200 ease-in hover:bg-gold hover:text-dark"
            >
              Favorites
            </Link>
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
