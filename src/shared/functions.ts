import type { Fetcher } from "swr";
import type { ChampionsDataReturnType } from "./models";

export const fetchChampionsData: Fetcher<
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
