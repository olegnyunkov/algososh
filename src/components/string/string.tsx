import React, {useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import styles from "./string.module.css";
import {ElementStates} from "../../types/element-states";
import {DELAY_IN_MS} from "../../constants/delays";

export type TStringArray = {
  char: string;
  state: ElementStates;
  index: number;
}

export const StringComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [stringArray, setStringArray] = useState<TStringArray[]>([]);
  const [buttonLoader, setButtonLoader] = useState<boolean>(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  const swapChars = (arr: TStringArray[], arg1: number, arg2: number) => {
    setTimeout(() => {
      const temp = arr[arg1];
      if(arr[arg1].index !== arr[arg2].index) {
        arr[arg1 + 1].state = ElementStates.Changing
        arr[arg2 - 1].state = ElementStates.Changing
      }
      arr[arg1] = arr[arg2];
      arr[arg2] = temp;
      arg1++;
      arg2--;
      arr[arg1 - 1].state = ElementStates.Modified
      arr[arg2 + 1].state = ElementStates.Modified
      setStringArray([...arr])
      if(arg2 >= arg1) {
        swapChars(arr, arg1, arg2);
      }
      if(arg2 < arg1) {
        setButtonLoader(false);
      }
    }, DELAY_IN_MS);
  };

  const onClick = () => {
    setButtonLoader(true);
    const array: TStringArray[] = [];
    inputValue.split("").forEach((item, index) => {
      array.push({
        char: item,
        state: ElementStates.Default,
        index: index + 1,
      })
    });
    setStringArray([...array])
    array[0].state = ElementStates.Changing
    array[array.length - 1].state = ElementStates.Changing
    const start = 0;
    const end = array.length - 1;
    swapChars(array, start, end);
  };

  return (
    <SolutionLayout title="Строка">
      <div className={styles.input__container}>
        <Input
          onInput={onChange}
          isLimitText={true}
          maxLength={11}/>
        <Button
          text="Развернуть"
          isLoader={buttonLoader}
          onClick={onClick}/>
      </div>
      <div className={styles.circle__container}>
        {stringArray.map((item, index) => {
          return <Circle
            key={index}
            letter={item.char}
            state={item.state}/>
        })}
      </div>
    </SolutionLayout>
  );
};
