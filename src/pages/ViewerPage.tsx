import { useMemo, useState } from "react";
import useSWR from "swr";
import FavoriteEmptyIcon from "../assets/icons/favorite-empty.svg";
import FavoriteFullIcon from "../assets/icons/favorite-full.svg";
import SearchIcon from "../assets/icons/search.svg";
import CustomModal from "../shared/components/CustomModal";
import { fetchChampionsData } from "../shared/functions";
import useStorage from "../shared/hooks/useStorage";
import type { ChampionsDataReturnType } from "../shared/models";

function ViewerPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChampion, setSelectedChampion] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
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

  const searchedData = useMemo(() => {
    const cleanedQuery = searchQuery.trim().toLowerCase();
    if (!cleanedQuery) {
      return dataWithFavorites;
    }
    return dataWithFavorites?.filter((champion) =>
      champion.name.toLowerCase().includes(searchQuery),
    );
  }, [dataWithFavorites, searchQuery]);

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

  const championsContent = searchedData?.map((champion) => (
    <div
      key={champion.key}
      className="group cursor-pointer relative p-2 bg-dark-transparent rounded-xl flex flex-col items-center gap-3"
      onClick={() => {
        setSelectedChampion(champion.id);
        setIsModalOpen(true);
      }}
    >
      <img
        src={`https://ddragon.leagueoflegends.com/cdn/16.13.1/img/champion/${champion.image.full}`}
        alt=""
        className="select-none h-32 w-auto"
        draggable="false"
      />
      <p className="text-amber-100 font-semibold text-2xl select-none">
        {champion.name}
      </p>
      <button className="hidden group-hover:block absolute top-4 right-4">
        <img
          src={champion.favorite ? FavoriteFullIcon : FavoriteEmptyIcon}
          alt="favorite"
          className="w-6 h-auto"
        />
      </button>
    </div>
  ));

  return (
    <>
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          className="text-amber-100 text-xl bg-dark-transparent border-amber-100 border rounded-xl p-2 pr-10"
        />
        <img
          src={SearchIcon}
          alt=""
          className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-auto"
        />
      </div>
      {searchedData?.length && (
        <div className="w-3/4 grid grid-cols-[repeat(auto-fit,minmax(250px,300px))] gap-4 justify-center items-center">
          {championsContent}
        </div>
      )}
      {!searchedData?.length && (
        <div className="rounded-2xl w-full flex justify-center">
          <div className="flex flex-col items-center gap-4 p-4 bg-dark-transparent rounded-2xl">
            <img
              src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExYXQ1cnplZnlsMjl5aGNpZjk5bmxiOWVoM290ano0bW90cmRxcXdxeiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/5Ay8TJlVmtWh6XYznJ/giphy.gif"
              alt=""
              className="h-40 w-auto select-none"
              draggable="false"
            />
            <p className="text-amber-100 text-3xl select-none ">
              No champions found...
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
              Do you want to change the favorite status for{" "}
              {data[selectedChampion].name}?
            </p>
          </div>
        </CustomModal>
      )}
    </>
  );
}

export default ViewerPage;
