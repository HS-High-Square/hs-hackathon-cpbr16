export type Stand = {
  id: string;
  name: string;
  categories: string[];
  percent: number;
  image: string;
  visitors: number;
};

export type StandUnity = {
  baseName: string;
  baseFilter: string;
  baseImageURL: string;
  peopleAmount: number;
  baseID: number;
  basePercent: number;
  completed: boolean;
};

export type StandList = {
  [index: string]: Stand;
};
