import {GrammarQS} from "../../interface/testing";

export interface GrammarChecker {
  group?: string;
  block?: string;
  type?: string;
  correct: GrammarQS[];
  incorrect: GrammarQS[];
}
