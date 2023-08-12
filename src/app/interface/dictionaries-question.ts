export interface DictionariesQuestion {
  _id: string;
  level: string;
  type: string;
  block: string;
  english: string;
  russian: string;
  tajik: string;
}

export interface DictionaryChecker {
  correct: DictionariesQuestion[];
  incorrect: DictionariesQuestion[];
  type: string;
  ballScore?: number;
  essay?: string;
  theme?: string;
}

