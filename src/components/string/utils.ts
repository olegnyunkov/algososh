import {TStringArray} from "./string";

export const swap = (array: TStringArray[], arg1: number, arg2: number) => {
  const temp = array[arg1];
  array[arg1] = array[arg2];
  array[arg2] = temp;
}