import React, {useEffect, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import styles from "./string.module.css";
import {ElementStates} from "../../types/element-states";
import {changeState, swap, timer} from "./utils";

export type TStringArray = {
  char: string;
  state: ElementStates;
  index: number;
}

export const StringComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [stringArray, setStringArray] = useState<TStringArray[]>([]);
  const [buttonLoader, setButtonLoader] = useState<boolean>(false);
  const [buttonState, setButtonState] = useState<boolean>(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  const onClick: React.MouseEventHandler<HTMLButtonElement> = async () => {
    setButtonLoader(true);
    setInputValue("")
    const array: TStringArray[] = []
    inputValue.split("").forEach((item, index) => {
      array.push({
        char: item,
        state: ElementStates.Default,
        index: index + 1
      })
    })
    let start = 0;
    let end = array.length - 1;
    array[start].state = ElementStates.Changing
    array[end].state = ElementStates.Changing
    setStringArray([...array])
    while(end >= start) {
      await timer()
      swap(array, start, end)
      changeState(array, start, end)
      setStringArray([...array])
      start++
      end--
    }

    setButtonLoader(false);
  };

  useEffect(() => {
    if(!inputValue) {
      setButtonState(true)
    } else {
      setButtonState(false)
    }
  }, [inputValue])

  return (
    <SolutionLayout title="Строка">
      <div className={styles.input__container}>
        <Input
          onInput={onChange}
          isLimitText={true}
          maxLength={11}
          value={inputValue}/>
        <Button
          text="Развернуть"
          isLoader={buttonLoader}
          onClick={onClick}
          disabled={buttonState}/>
      </div>
      <div className={styles.circle__container}>
        {stringArray.map((item, index) => {
          return <Circle
            key={index}
            letter={item.char}
            state={item.state}
          />
        })}
      </div>
    </SolutionLayout>
  );
};
