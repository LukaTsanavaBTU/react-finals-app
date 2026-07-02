import { useNavigate } from "react-router-dom";
import LolLogo from "../assets/images/lol-logo.png";

function HomePage() {
  const navigate = useNavigate();

  return (
    <>
      <div className="h-full flex items-center justify-center">
        <div className="text-center max-w-3/4 flex flex-col gap-8 items-center">
          <img src={LolLogo} alt="" className="w-30 h-auto sm:w-60" />
          <h2 className="text-gold font-bold text-8xl hidden md:block [@media(max-height:1000px)]:hidden!">
            LoL Champion Viewer
          </h2>
          <p className="text-gold text-2xl">
            Browse your favorite champions from League of Legends and save your
            favorite champions for easier access!
          </p>
          <div className="flex flex-col gap-4 items-center">
            <button
              className="rounded-2xl text-gold border border-gold bg-light text-2xl font-semibold p-4
              transition duration-300 ease-out  hover:brightness-110 hover:-translate-y-1 active:translate-y-0 active:scale-95"
              onClick={() => {
                navigate("/viewer");
              }}
            >
              Browse <span className="hidden sm:inline">Champions</span>
            </button>
            <button
              className="rounded-2xl text-light border border-light bg-gold text-2xl font-semibold p-4
              transition duration-300 ease-out  hover:brightness-110 hover:-translate-y-1 active:translate-y-0 active:scale-95"
              onClick={() => {
                navigate("/favorites");
              }}
            >
              Favorite <span className="hidden sm:inline">Champions</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
