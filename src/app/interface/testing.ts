import {
  GrammarQuestion,
  ListeningQuestions,
  ReadingQuestion,
  WritingQuestion
} from "../activities/testing/testing.interface";
import {DictionariesQuestion} from "./dictionaries-question";


export interface GrammarQS extends GrammarQuestion {
  options: string[];
}

export interface ReadingQS extends ReadingQuestion {
  options: string[];
}

export interface ListeningQS extends ListeningQuestions {
  options: string[];
}

//i dont know
export interface DictionaryQS extends DictionariesQuestion {
}

export interface WritingQS extends WritingQuestion {
}
