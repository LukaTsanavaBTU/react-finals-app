import { useMemo, useState } from "react";
import useSWR from "swr";
import UnfavoriteIcon from "../assets/icons/unfavorite.svg";
import CustomModal from "../shared/components/CustomModal";
import useStorage from "../shared/hooks/useStorage";
import type { ChampionsDataReturnType } from "../shared/models";
import { fetchChampionsData } from "../shared/functions";
import AttackIcon from "../assets/icons/attack.svg";
import MagicIcon from "../assets/icons/magic.svg";
import DefenseIcon from "../assets/icons/defense.svg";
import DifficultyIcon from "../assets/icons/difficulty.svg";

function FavoritesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChampion, setSelectedChampion] = useState<string | null>(null);
  const { data, error, isLoading } = useSWR<
    Record<string, ChampionsDataReturnType>
  >("champions", fetchChampionsData);
  const [favoritedChampions, setFavoritedChampions] = useStorage<string[]>(
    "favorites",
    [],
  );
  const dataWithFavorites = useMemo(() => {
    if (!data) {
      return;
    }
    const newData = structuredClone(data);
    favoritedChampions.forEach((id) => (newData[id].favorite = true));
    const arrayData = Object.values(newData);
    return arrayData;
  }, [favoritedChampions, data]);

  const onlyFavorites = useMemo(() => {
    return dataWithFavorites?.filter((champion) => champion.favorite);
  }, [dataWithFavorites]);

  function toggleChampionFavorite() {
    if (!selectedChampion) {
      return;
    }
    const champIndex = favoritedChampions.findIndex(
      (item) => item === selectedChampion,
    );
    if (champIndex === -1) {
      setFavoritedChampions([...favoritedChampions, selectedChampion]);
    } else {
      setFavoritedChampions(favoritedChampions.toSpliced(champIndex, 1));
    }
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading profile</div>;

  const championsContent = onlyFavorites?.map((champion) => (
    <div
      key={champion.key}
      className="group cursor-pointer relative p-2 bg-dark-transparent rounded-xl flex flex-col md:flex-row start gap-3"
      onClick={() => {
        setSelectedChampion(champion.id);
        setIsModalOpen(true);
      }}
    >
      <img
        src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.id}_0.jpg`}
        alt=""
        className="select-none"
        draggable="false"
      />
      <div className="flex-1 flex flex-col gap-4 text-center md:text-start">
        <div className="flex flex-col gap-2 text-gold ">
          <p className="text-4xl md:text-6xl font-bold">{champion.name}</p>
          <p className="text-xl md:text-2xl font-semibold">{champion.title}</p>
          <p className="text-amber-100 text-lg">
            {champion.blurb.split(".").slice(0, -4).join(".")}.
          </p>
        </div>
        <div className="w-full h-0.5 bg-amber-100 opacity-10"></div>
        <div className="text-amber-100 text-2xl flex flex-col gap-2">
          <p>
            <span className="text-gold font-bold">Roles:</span>{" "}
            {champion.tags.map((tag, index) =>
              index === champion.tags.length - 1 ? `${tag}.` : `${tag},`,
            )}
          </p>
          <p>
            <span className="text-gold font-bold">Resource:</span>{" "}
            {champion.partype}
          </p>
          <div className="flex gap-4 items-center mt-10 justify-center md:justify-start">
            <div className="flex flex-col items-center" title="Attack">
              <img
                src={AttackIcon}
                alt="Attack"
                className="filter-[brightness(0)saturate(100%)invert(55%)sepia(98%)saturate(337%)hue-rotate(1deg)brightness(88%)contrast(90%)] h-10 w-auto"
              />
              <p className="text-gold font-bold">{champion.info.attack}</p>
            </div>
            <div className="flex flex-col items-center" title="Defense">
              <img
                src={DefenseIcon}
                alt="Defense"
                className="filter-[brightness(0)saturate(100%)invert(55%)sepia(98%)saturate(337%)hue-rotate(1deg)brightness(88%)contrast(90%)] h-10 w-auto"
              />
              <p className="text-gold font-bold">{champion.info.defense}</p>
            </div>
            <div className="flex flex-col items-center" title="Magic">
              <img
                src={MagicIcon}
                alt="Magic"
                className="filter-[brightness(0)saturate(100%)invert(55%)sepia(98%)saturate(337%)hue-rotate(1deg)brightness(88%)contrast(90%)] h-10 w-auto"
              />
              <p className="text-gold font-bold">{champion.info.magic}</p>
            </div>
            <div className="flex flex-col items-center" title="Difficulty">
              <img
                src={DifficultyIcon}
                alt="Difficulty"
                className="filter-[brightness(0)saturate(100%)invert(55%)sepia(98%)saturate(337%)hue-rotate(1deg)brightness(88%)contrast(90%)] h-10 w-auto"
              />
              <p className="text-gold font-bold">{champion.info.difficulty}</p>
            </div>
          </div>
        </div>
      </div>
      <button className="hidden group-hover:block absolute top-4 right-4">
        <img src={UnfavoriteIcon} alt="favorite" className="w-12 h-auto" />
      </button>
    </div>
  ));

  return (
    <>
      {onlyFavorites?.length && (
        <div className="p-2 lg:w-3/4 flex flex-col gap-4">
          {championsContent}
        </div>
      )}
      {!onlyFavorites?.length && (
        <div className="rounded-2xl w-full flex justify-center">
          <div className="flex flex-col items-center gap-4 p-4 bg-dark-transparent rounded-2xl">
            <img
              src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExYXQ1cnplZnlsMjl5aGNpZjk5bmxiOWVoM290ano0bW90cmRxcXdxeiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/5Ay8TJlVmtWh6XYznJ/giphy.gif"
              alt=""
              className="h-40 w-auto select-none"
              draggable="false"
            />
            <p className="text-amber-100 text-3xl select-none ">
              You don't have any favorites...
            </p>
          </div>
        </div>
      )}
      {data && selectedChampion && (
        <CustomModal
          isOpen={isModalOpen}
          onClose={() => {
            setSelectedChampion(null);
            setIsModalOpen(false);
          }}
          onAccept={() => {
            toggleChampionFavorite();
            setSelectedChampion(null);
            setIsModalOpen(false);
          }}
        >
          <div className="flex flex-col gap-4">
            <img
              src={`https://ddragon.leagueoflegends.com/cdn/16.13.1/img/champion/${data[selectedChampion].image.full}`}
              alt=""
              className="self-center h-32 w-auto"
            />
            <p>
              Do you want to delete {data[selectedChampion].name} from your
              favorites list?
            </p>
          </div>
        </CustomModal>
      )}
    </>
  );
}

export default FavoritesPage;
