import React, {useEffect, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import styles from "./stack-page.module.css";
import {Circle} from "../ui/circle/circle";
import {ElementStates} from "../../types/element-states";

export const StackPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string | number>("")
  const [stackArray, setStackArray] = useState<{ letter: string | number, state: ElementStates, head: string }[]>([])
  const [buttonState, setButtonState] = useState<boolean>(false);
  const [removeButtonState, setRemoveButtonState] = useState<boolean>(false)
  const [resetButtonState, setResetButtonState] = useState<boolean>(false)
  const [buttonLoader, setButtonLoader] = useState<boolean>(false);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const timer = () => {
    return new Promise((res) => {
      setTimeout(() => {
        res(null)
      }, 500)
    })
  }

  const addToStack: React.MouseEventHandler<HTMLButtonElement> =async () => {
    setButtonLoader(true)
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
    await timer()
    setButtonLoader(false)
    setInputValue("")
  }

  const removeFromStack: React.MouseEventHandler<HTMLButtonElement> = async () => {
    setButtonLoader(true)
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
    await timer()
    setButtonLoader(false)
  }

  const clearStack: React.MouseEventHandler<HTMLButtonElement> = () => {
    setStackArray([])
  }

  useEffect(() => {
    if (inputValue && inputValue.toString().length > 4 || !inputValue) {
      setButtonState(true)
    } else {
      setButtonState(false)
    }
    if (!stackArray.length) {
      setRemoveButtonState(true)
      setResetButtonState(true)
    } else {
      setRemoveButtonState(false)
      setResetButtonState(false)
    }
  }, [inputValue, stackArray.length])

  return (
    <SolutionLayout title="Стек">
      <div className={styles.stack__controls}>
        <div className={styles.stack__input}>
          <Input
            type="text"
            isLimitText={true}
            maxLength={4}
            onChange={onChange}
            value={inputValue}/>
          <Button
            text="Добавить"
            onClick={addToStack}
            disabled={buttonState}
            isLoader={buttonLoader}/>
          <Button
            text="Удалить"
            onClick={removeFromStack}
            disabled={removeButtonState}
            isLoader={buttonLoader}/>
        </div>
        <Button
          text="Очистить"
          onClick={clearStack}
          disabled={resetButtonState}/>
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
