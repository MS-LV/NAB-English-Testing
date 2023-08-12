export interface GrammarQuestion {
  id: string;
  level: string;
  block: string;
  description: string;
  answer: string;
  option: string;
}

export interface ListeningQuestions extends GrammarQuestion {
}

export interface ReadingQuestion extends GrammarQuestion {
}

export interface WritingQuestion {
  id: string;
  level: string;
  block: string;
  theme: string;
}


export interface TestingSave {
  type: string;
  block: string;
  group: string;
  correct: [];
  incorrect: [];
}
