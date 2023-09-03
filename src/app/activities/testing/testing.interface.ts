export interface GrammarQuestion {
  id: string;
  level: string;
  block: string;
  description: string;
  answer: string;
  option: string;
  options: string[]
}

export interface ListeningQuestions extends GrammarQuestion {
}

export interface ReadingQuestion extends GrammarQuestion {
  text: string;
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
