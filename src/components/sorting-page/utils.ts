import {SHORT_DELAY_IN_MS} from "../../constants/delays";
import {ElementStates} from "../../types/element-states";

export const timer = () => {
  return new Promise((res) => {setTimeout(res, SHORT_DELAY_IN_MS)})
}

export const swapChars = (arr: {index: number; state: ElementStates}[], arg1: number, arg2: number) => {
  const temp = arr[arg1]
  arr[arg1] = arr[arg2]
  arr[arg2] = temp
}