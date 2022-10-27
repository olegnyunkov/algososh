import React, {useState, useEffect} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import styles from "./queue-page.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {ElementStates} from "../../types/element-states";
import {Queue, timer} from "./utils";

export type TQueue = {
  value: string | number;
  state: ElementStates;
}

export const QueuePage: React.FC = () => {
  const queue = new Queue<TQueue>(7);
  const [inputValue, setInputValue] = useState<number | string>("");
  const [tempArray, setTempArray] = useState<Queue<TQueue>>(queue);
  const [stackQueue, setStackQueue] = useState<(TQueue | null)[]>([]);
  const [addButtonState, setAddButtonState] = useState<boolean>(false);
  const [removeButtonState, setRemoveButtonState] = useState<boolean>(false);
  const [resetButtonState, setResetButtonState] = useState<boolean>(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  };

  const generateArray = () => {
    const array = []
    for(let i = 0; i < 7; i++) {
      array.push(<Circle
        key={i}
        state={ElementStates.Default}
        letter=''
        index={i}
        head=''
        tail=''
      />)
    }
    return array
  };

  const addToQueue: React.MouseEventHandler<HTMLButtonElement> = async () => {
    setAddButtonState(true)
    tempArray.enqueue({value: inputValue, state: ElementStates.Changing})
    setTempArray(tempArray)
    setStackQueue([...tempArray.getItems()])
    await timer()
    const tail = tempArray.getItems()[tempArray.getTail()]
    if(tail) {
      tail.state = ElementStates.Default
    }
    setTempArray(tempArray)
    setStackQueue([...tempArray.getItems()])
    setAddButtonState(false)
    setInputValue("")
  };

  const removeFromQueue: React.MouseEventHandler<HTMLButtonElement> = async () => {
    setRemoveButtonState(true)
    const head = tempArray.peak()
    if(head) {
      head.state = ElementStates.Changing
    }
    setTempArray(tempArray)
    setStackQueue([...tempArray.getItems()])
    await timer()
    tempArray.dequeue()
    setTempArray(tempArray)
    setStackQueue([...tempArray.getItems()])
    setRemoveButtonState(false)
  };

  const clearQueue: React.MouseEventHandler<HTMLButtonElement> = () => {
    setResetButtonState(true)
    tempArray.clear()
    setTempArray(tempArray)
    setStackQueue([...tempArray.getItems()])
  };

  useEffect(() => {
    if(!inputValue) {
      setAddButtonState(true)
    } else {
      setAddButtonState(false)
    }
    if(!stackQueue.length) {
      setRemoveButtonState(true)
      setResetButtonState(true)
    } else {
      setRemoveButtonState(false)
      setResetButtonState(false)
    }
  }, [inputValue, stackQueue.length]);

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
            disabled={removeButtonState}
          />
        </div>
        <Button
          text="Очистить"
          onClick={clearQueue}
          disabled={resetButtonState}
        />
      </div>
      <div className={styles.circle__container}>
        {tempArray.isEmpty() && generateArray()}
        {!tempArray.isEmpty() && stackQueue.map((item, index) => {
          return <Circle
            key={index}
            letter={item?.value || ""}
            index={index}
            head={index === tempArray.getHead() ? "head" : ""}
            tail={index === tempArray.getTail() ? "tail" : ""}
            state={item?.state}/>
        })}
      </div>
    </SolutionLayout>
  );
};
