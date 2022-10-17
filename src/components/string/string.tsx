import React, {useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import styles from "./string.module.css"
import { ElementStates } from "../../types/element-states";

export const StringComponent: React.FC = () => {
  const [inputText, setInputText] = useState<string>("");
  const [inputArray, setInputArray] = useState<string[]>([]);
  const [buttonLoader, setButtonLoader] = useState<boolean>(false);
  const [circleState, setCircleState] = useState<ElementStates>(ElementStates.Default)
  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputText(e.target.value)
  };
  const swapChars = (arr: string[], arg1: number, arg2: number) => {
    setTimeout(() => {
      const temp = arr[arg1];
      arr[arg1] = arr[arg2];
      arr[arg2] = temp
      arg1++;
      arg2--;
      setInputArray([...arr])
      if(arg2 >= arg1) {
        swapChars(arr, arg1, arg2)
      }
      if(arg2 < arg1) {
        setButtonLoader(false)
      }
    }, 1000)
  }

  const onClick = () => {
    setButtonLoader(true)
    const array = inputText.split("");
    setInputArray(array)
    let start = 0;
    let end = array.length - 1;
    swapChars(array, start, end)
  }

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
        {inputArray.map((char, index) => {
          return <Circle
            key={index}
            letter={char}
            state={circleState}/>
        })}
      </div>
    </SolutionLayout>
  );
};
