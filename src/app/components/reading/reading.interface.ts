import {ReadingQS} from "../../interface/testing";

export interface ReadingChecker {
  group?: string;
  block?: string;
  type?: string;
  correct: ReadingQS[];
  incorrect: ReadingQS[];
}
