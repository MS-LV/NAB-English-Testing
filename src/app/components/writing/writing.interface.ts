import {WritingQS} from "../../interface/testing";

export interface WritingChecker {
  group?: string;
  block?: string;
  type?: string;
  correct: WritingQS[];
  incorrect: WritingQS[];
}
