import React, {useEffect, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import styles from "./fibonacci-page.module.css"
import {timer} from "./utils";

export const FibonacciPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<number>();
  const [resultArray, setResultArray] = useState<number[]>([]);
  const [buttonState, setButtonState] = useState<boolean>(false);
  const [buttonLoader, setButtonLoader] = useState<boolean>(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(+e.target.value)
  };

  const fibonacci = async (n: number) => {
    const arrStart = [0, 1]
    const tempArray: number[] = []
    for (let k = 0; k < arrStart.length; k++) {
      await timer()
      tempArray.push(arrStart[k])
      setResultArray([...tempArray])
    }
    for (let i = 2; i < n + 1; i++) {
      await timer()
      tempArray.push(tempArray[i - 2] + tempArray[i - 1])
      setResultArray([...tempArray])
    }
    setButtonLoader(false)
  }

  const onClick = () => {
    setButtonLoader(true)
    inputValue && fibonacci(inputValue)
  }

  useEffect(() => {
    if (inputValue && inputValue < 1 || inputValue && inputValue > 19 || inputValue === 0) {
      setButtonState(true)
    } else {
      setButtonState(false)
    }
  }, [inputValue])

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.input__container}>
        <Input
          placeholder="Введите число"
          type="number"
          isLimitText={true}
          max={19}
          onChange={onChange}/>
        <Button
          text="Рассчитать"
          onClick={onClick}
          disabled={buttonState}
          isLoader={buttonLoader}/>
      </div>
      <div className={styles.circle__container}>
        {resultArray.map((char, index) => {
          return <Circle
            key={index}
            letter={char}
            index={index}/>
        })}
      </div>
    </SolutionLayout>
  );
};
