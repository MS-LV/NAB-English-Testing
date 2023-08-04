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
  group?: string;
  block?: string;
  correct: DictionariesQuestion[];
  incorrect: DictionariesQuestion[];
  type: string;
  essay?: string;
  theme?: string;
}
