import React, {useEffect, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import styles from "./stack-page.module.css";
import {Circle} from "../ui/circle/circle";
import {ElementStates} from "../../types/element-states";
import {Stack, timer} from "./utils";

type TStackItem = {
  letter: string | number;
  state: ElementStates;
  head: string
};

export const StackPage: React.FC = () => {
  const stack = new Stack<TStackItem>()

  const [inputValue, setInputValue] = useState<string | number>("")
  const [tempArray, setTempArray] = useState<Stack<TStackItem>>(stack)
  const [stackArray, setStackArray] = useState<TStackItem[]>([])
  const [buttonState, setButtonState] = useState<boolean>(false);
  const [removeButtonState, setRemoveButtonState] = useState<boolean>(false)
  const [resetButtonState, setResetButtonState] = useState<boolean>(false)
  const [buttonLoader, setButtonLoader] = useState<boolean>(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const addToStack: React.MouseEventHandler<HTMLButtonElement> = async () => {
    setButtonLoader(true)
    tempArray.push({letter: inputValue, state: ElementStates.Changing, head: ""})
    setTempArray(tempArray)
    setStackArray([...tempArray.getItems()])
    await timer()
    tempArray.peak().state = ElementStates.Default
    setTempArray(tempArray)
    setStackArray([...tempArray.getItems()])
    await timer()
    setButtonLoader(false)
    setInputValue("")
  }

  const removeFromStack: React.MouseEventHandler<HTMLButtonElement> = async () => {
    setButtonLoader(true)
    tempArray.peak().state = ElementStates.Changing
    setTempArray(tempArray)
    setStackArray([...tempArray.getItems()])
    await timer()
    tempArray.pop()
    setTempArray(tempArray)
    setStackArray([...tempArray.getItems()])
    await timer()
    setButtonLoader(false)
  }

  const clearStack: React.MouseEventHandler<HTMLButtonElement> = () => {
    tempArray.clear()
    setTempArray(tempArray)
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

  useEffect(() => {
    if(stackArray.length > 0) {
      stackArray[stackArray.length - 1].head = "top"
    }
    if(stackArray.length > 1) {
      stackArray[stackArray.length - 2].head = ""
    }
  }, [stackArray.length])

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
