import {TStringArray} from "./string";
import {ElementStates} from "../../types/element-states";
import {DELAY_IN_MS} from "../../constants/delays";

export const swap = (array: TStringArray[], arg1: number, arg2: number) => {
  const temp = array[arg1];
  array[arg1] = array[arg2];
  array[arg2] = temp;
  return array
}

export const changeState = (array: TStringArray[], arg1: number, arg2: number) => {
  if(arg1 + 1 <= arg2 - 1) {
    array[arg1 + 1].state = ElementStates.Changing
    array[arg2 - 1].state = ElementStates.Changing
  }
  array[arg1].state = ElementStates.Modified
  array[arg2].state = ElementStates.Modified
  return array
}

export const timer = () => {
  return new Promise((res) => {
    setTimeout(res, DELAY_IN_MS)
  })
}