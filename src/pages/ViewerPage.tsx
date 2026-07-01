import useSWR, { type Fetcher } from "swr";
import FavoriteEmptyIcon from "../assets/icons/favorite-empty.svg";
import FavoriteFullIcon from "../assets/icons/favorite-full.svg";
import useStorage from "../hooks/useStorage";
import { useMemo } from "react";

interface ChampionsDataReturnType {
  id: string;
  name: string;
  title: string;
  tags: string[];
  image: { full: string };
  favorite?: boolean;
  key: string;
}

const fetchChampionsData: Fetcher<
  Record<string, ChampionsDataReturnType>,
  string
> = async () => {
  const res = await fetch(
    "https://ddragon.leagueoflegends.com/cdn/13.1.1/data/en_US/champion.json",
  );
  if (!res.ok) throw new Error("Network error");
  const jsonData = await res.json();
  return jsonData.data;
};

function ViewerPage() {
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

  function onChampionFavoriteClick(id: string) {
    const champIndex = favoritedChampions.findIndex((item) => item === id);
    if (champIndex === -1) {
      setFavoritedChampions([...favoritedChampions, id]);
    } else {
      setFavoritedChampions(favoritedChampions.toSpliced(champIndex, 1));
    }
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading profile</div>;

  const championsContent = dataWithFavorites?.map((champion) => (
    <div
      key={champion.key}
      className="group cursor-pointer relative p-2 bg-dark-transparent rounded-xl flex flex-col items-center gap-3"
      onClick={() => {
        onChampionFavoriteClick(champion.id);
      }}
    >
      <img
        src={`https://ddragon.leagueoflegends.com/cdn/16.13.1/img/champion/${champion.image.full}`}
        alt=""
        className="select-none"
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
    <div className="w-3/4 grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
      {data && championsContent}
    </div>
  );
}

export default ViewerPage;
