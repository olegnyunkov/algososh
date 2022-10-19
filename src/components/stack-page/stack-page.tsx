import React, {useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import styles from "./stack-page.module.css";
import {Circle} from "../ui/circle/circle";

export const StackPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<number>()
  const [stackArray, setStackArray] = useState<number[]>([])
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(+e.target.value)
  }

  const addToStack = () => {
    inputValue && stackArray.push(inputValue)
    setStackArray([...stackArray])
  }

  const removeFromStack = () => {
    stackArray.pop()
    setStackArray([...stackArray])
  }

  const clearStack = () => {
    setStackArray([])
  }

  return (
    <SolutionLayout title="Стек">
      <div className={styles.stack__controls}>
        <div className={styles.stack__input}>
          <Input
            type="number"
            isLimitText={true}
            max={4}
            onChange={onChange}/>
          <Button
            text="Добавить"
            onClick={addToStack}/>
          <Button
            text="Удалить"
            onClick={removeFromStack}/>
        </div>
        <Button
          text="Очистить"
          onClick={clearStack}/>
      </div>
      <div className={styles.circle__container}>
        {stackArray.map((char, index) => {
          return <Circle
            key={index}
            letter={char}
            index={index}
          />
        })}
      </div>
    </SolutionLayout>
  );
};
