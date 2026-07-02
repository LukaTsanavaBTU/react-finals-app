import useSWR, { type Fetcher } from "swr";
import UnfavoriteIcon from "../assets/icons/unfavorite.svg";
import useStorage from "../shared/hooks/useStorage";
import { useMemo, useState } from "react";
import CustomModal from "../shared/components/CustomModal";

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
      className="group cursor-pointer relative p-2 bg-dark-transparent rounded-xl flex start gap-3"
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
      <p className="text-amber-100 font-semibold text-2xl select-none">
        {champion.name}
      </p>
      <button className="hidden group-hover:block absolute top-4 right-4">
        <img src={UnfavoriteIcon} alt="favorite" className="w-6 h-auto" />
      </button>
    </div>
  ));

  return (
    <>
      {onlyFavorites?.length && (
        <div className="w-3/4 flex flex-col gap-4">{championsContent}</div>
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
