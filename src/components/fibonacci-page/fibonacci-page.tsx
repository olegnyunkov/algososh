import React, {useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import styles from "./fibonacci-page.module.css"

export const FibonacciPage: React.FC = () => {
  const inputStyles = {
    display: "flex",
    maxWidth: 522,
    justifyContent: "space-between",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 74
  };
  const circleStyles = {
    display: "flex",
    margin: "auto",
    maxWidth: 944,
    justifyContent: "center"
  };

  const [inputText, setInputText] = useState<number>();
  const [resultArray, setResultArray] = useState<number[]>([])
  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputText(+e.target.value)
  };

  const fibonacci = (n: number) => {
    const arrStart = [0, 1]
    for (let i = 2; i < n + 1; i++) {
      arrStart.push(arrStart[i - 2] + arrStart[i - 1])
      setResultArray(arrStart)
    }
  }


  const onClick = () => {
    inputText && fibonacci(inputText)
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.input__container}>
        <Input
          type="number"
          isLimitText={true}
          max={19}
          onChange={onChange}/>
        <Button
          text="Рассчитать"
          onClick={onClick}/>
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
