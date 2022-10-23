import React, {useEffect, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import styles from "./stack-page.module.css";
import {Circle} from "../ui/circle/circle";
import {ElementStates} from "../../types/element-states";

export const StackPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<number>()
  const [stackArray, setStackArray] = useState<{ letter: number, state: ElementStates, head: string }[]>([])
  const [buttonState, setButtonState] = useState<boolean>(false)
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(+e.target.value)
  }

  const timer = () => {
    return new Promise((res) => {
      setTimeout(() => {
        res(null)
      }, 500)
    })
  }

  const addToStack = () => {
    inputValue && stackArray.push({letter: inputValue, state: ElementStates.Default, head: ""})
    stackArray.forEach(async (item) => {
      if (stackArray.indexOf(item) === stackArray.indexOf(stackArray[stackArray.length - 1])) {
        item.head = "top"
        item.state = ElementStates.Changing
        await timer()
        item.state = ElementStates.Default
        setStackArray([...stackArray])
      } else {
        item.head = ""
        item.state = ElementStates.Default
      }
    })
    setStackArray([...stackArray])
  }

  const removeFromStack = async () => {
    stackArray.forEach((item) => {
      if (stackArray.indexOf(item) === stackArray.indexOf(stackArray[stackArray.length - 1])) {
        item.head = "top"
        item.state = ElementStates.Changing
        setStackArray([...stackArray])
      } else {
        item.head = ""
      }
    })
    await timer()
    stackArray.pop()
    setStackArray([...stackArray])
  }

  const clearStack = () => {
    setStackArray([])
  }

  useEffect(() => {
    if (inputValue && inputValue.toString().length > 4) {
      setButtonState(true)
    } else {
      setButtonState(false)
    }
  }, [inputValue])

  return (
    <SolutionLayout title="Стек">
      <div className={styles.stack__controls}>
        <div className={styles.stack__input}>
          <Input
            type="number"
            isLimitText={true}
            max={9999}
            onChange={onChange}/>
          <Button
            text="Добавить"
            onClick={addToStack}
            disabled={buttonState}/>
          <Button
            text="Удалить"
            onClick={removeFromStack}
            disabled={buttonState}/>
        </div>
        <Button
          text="Очистить"
          onClick={clearStack}
          disabled={buttonState}/>
      </div>
      <div className={styles.circle__container}>
        {stackArray.map((item, index) => {
          return <Circle
            key={index}
            letter={item.letter}
            index={index}
            head={item.head}
            state={item.state}
          />
        })}
      </div>
    </SolutionLayout>
  );
};
