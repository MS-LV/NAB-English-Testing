import {DictionariesQuestion} from "./dictionaries-question";

export interface HistoryResponse {
  id: string;
  group: string;
  block: string;
  correct: DictionariesQuestion[];
  incorrect: DictionariesQuestion[];
  user: string;
  type: string;
  score: number;
  createdAt: string;
  updatedAt: string;
}
