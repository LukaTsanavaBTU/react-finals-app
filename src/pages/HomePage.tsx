import { useNavigate } from "react-router-dom";
import LolLogo from "../assets/images/lol-logo.png";

import BackgroundImage from "../assets/images/background.jpg";

function HomePage() {
  const navigate = useNavigate();

  return (
    <>
      <div className="relative h-full flex items-center justify-center">
        <div
          style={{ backgroundImage: `url(${BackgroundImage})` }}
          className="absolute inset-0 h-full w-full bg-cover bg-center bg-no-repeat opacity-10 z-0"
        ></div>
        <div className="relative z-10 text-center max-w-3/4 flex flex-col gap-8 items-center">
          <img src={LolLogo} alt="" className="w-60 h-auto" />
          <h2 className="text-gold font-bold text-8xl">LoL Champion Viewer</h2>
          <p className="text-gold text-2xl">
            Browse your favorite champions from League of Legends and try your
            luck with the random champion selector!
          </p>
          <div className="flex flex-col gap-4 items-center">
            <button
              className="rounded-2xl text-gold border border-gold bg-light text-2xl font-semibold p-4 hover:brightness-110"
              onClick={() => {
                navigate("/viewer");
              }}
            >
              Browse Champions
            </button>
            <button
              className="rounded-2xl text-light border border-light bg-gold text-2xl font-semibold p-4 hover:brightness-110"
              onClick={() => {
                navigate("/random");
              }}
            >
              Random Champion
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
