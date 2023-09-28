import {DictionaryChecker} from "./dictionaries-question";

export interface HistoryResponse {
  _id: string;
  group: string;
  block: string;
  data: DictionaryChecker[];
  user: { id: string; name: string; surename: string };
  type: string;
  score: number;
  createdAt: string;
  updatedAt: string;
  isExpired: boolean
}


