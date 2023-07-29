import {ListeningQS} from "../../interface/testing";

export interface ListeningChecker {
  group?: string;
  block?: string;
  type?: string;
  correct: ListeningQS[];
  incorrect: ListeningQS[];
}
