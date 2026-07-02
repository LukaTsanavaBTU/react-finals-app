export interface ChampionsDataReturnType {
  id: string;
  name: string;
  title: string;
  tags: string[];
  image: { full: string };
  favorite?: boolean;
  key: string;
  blurb: string;
  partype: string;
  info: { attack: number; defense: number; magic: number; difficulty: number };
}
