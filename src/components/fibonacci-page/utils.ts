import {SHORT_DELAY_IN_MS} from "../../constants/delays";

export const timer = () => {
  return new Promise((res) => {setTimeout(res, SHORT_DELAY_IN_MS)})
}