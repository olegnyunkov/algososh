import React, {useEffect, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import styles from "./queue-page.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {ElementStates} from "../../types/element-states";

export type TArrElement = {
  letter: number | null | undefined;
  head: string;
  tail: string;
  state: ElementStates;
  id: number | null
}

export const QueuePage: React.FC = () => {
  const arrElement = {
    letter: null,
    head: "",
    tail: "",
    state: ElementStates.Default,
    id: null,
  }
  const array = Array.from({length: 7}, () => arrElement)
  const [inputValue, setInputValue] = useState<number | string>("")
  const [stackQueue, setStackQueue] = useState<TArrElement[]>([...array])
  const [addCount, setAddCount] = useState<number>(0)
  const [removeCount, setRemoveCount] = useState<number>(0)
  const [addButtonState, setAddButtonState] = useState<boolean>(false)
  const [removeButtonState, setRemoveButtonState] = useState<boolean>(false)
  const [resetButtonState, setResetButtonState] = useState<boolean>(false)
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

  const addToQueue: React.MouseEventHandler<HTMLButtonElement> = async () => {
    //@ts-ignore
    arrElement.letter = inputValue;
    //@ts-ignore
    arrElement.id = addCount;
    arrElement.state = ElementStates.Changing
    stackQueue.splice(addCount, 1, arrElement)
    stackQueue.forEach((item) => {
      if(addCount === item.id) {
        item.head = "head"        
      } else {
        item.head = ""
      }
    })    
    setStackQueue([...stackQueue])
    await timer()
    arrElement.state = ElementStates.Default
    const counter = addCount + 1
    setAddCount(counter)
  }

  const removeFromQueue: React.MouseEventHandler<HTMLButtonElement> = async () => {
    stackQueue[removeCount].state = ElementStates.Changing
    setStackQueue([...stackQueue])
    await timer()
    stackQueue[removeCount].letter = null
    stackQueue.forEach((item) => {
      if(removeCount + 1 === item.id) {
        item.tail = "tail"        
      } else {
        item.tail = ""
      }
    })
    stackQueue[removeCount].state = ElementStates.Default      
    setStackQueue([...stackQueue])
    const counter = removeCount + 1
    setRemoveCount(counter)
  }

  const clearQueue: React.MouseEventHandler<HTMLButtonElement> = () => {
    setStackQueue([...array])
    setAddCount(0)
    setRemoveCount(0)
  }

  useEffect(() => {
    if(addCount > 6 || !inputValue || inputValue.toString().length > 4) {
      setAddButtonState(true)
    } else {
      setAddButtonState(false)
    }
    if(removeCount > 6 || !inputValue || removeCount >= addCount) {
      setRemoveButtonState(true)
    } else {
      setRemoveButtonState(false)
    }
    if(!addCount) {
      setResetButtonState(true)
    } else {
      setResetButtonState(false)
    }
  }, [inputValue, addCount, removeCount])

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.queue__controls}>
        <div className={styles.queue__input}>
          <Input
            type="text"
            isLimitText={true}
            maxLength={4}
            onChange={onChange}
            value={inputValue}
          />
          <Button
            text="Добавить"
            onClick={addToQueue}
            disabled={addButtonState}
          />
          <Button
            text="Удалить"
            onClick={removeFromQueue}
            disabled={resetButtonState}
          />
        </div>
        <Button
          text="Очистить"
          onClick={clearQueue}
          disabled={resetButtonState}
        />
      </div>
      <div className={styles.circle__container}>
        {stackQueue.map((item, index) => {
          return <Circle
            key={index}
            letter={item.letter}
            index={index}
            head={item.head}
            tail={item.tail}
            state={item.state}/>
        })}
      </div>
    </SolutionLayout>
  );
};
