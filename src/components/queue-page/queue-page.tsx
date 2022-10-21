import React, {useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import styles from "./queue-page.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";

export const QueuePage: React.FC = () => {
  const array = Array.from({length: 7}, () => null)
  const [inputValue, setInputValue] = useState<number>()
  const [stackQueue, setStackQueue] = useState<number[] | null[]>([...array])
  const [addCount, setAddCount] = useState<number>(0)
  const [removeCount, setRemoveCount] = useState<number>(0)
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(+e.target.value)
  }

  const addToQueue = () => {
    inputValue && stackQueue.splice(addCount, 1, inputValue)
    setStackQueue([...stackQueue])
    const counter = addCount + 1
    setAddCount(counter)
  }

  const removeFromQueue = () => {
    delete(stackQueue[removeCount])
    setStackQueue([...stackQueue])
    const counter = removeCount + 1
    setRemoveCount(counter)
  }

  const clearQueue = () => {
    setStackQueue([...array])
    setAddCount(0)
    setRemoveCount(0)
  }

  console.log(addCount, removeCount)
  return (
    <SolutionLayout title="Очередь">
      <div className={styles.queue__controls}>
        <div className={styles.queue__input}>
          <Input
            type="number"
            isLimitText={true}
            max={4}
            onChange={onChange}
          />
          <Button
            text="Добавить"
            onClick={addToQueue}
          />
          <Button
            text="Удалить"
            onClick={removeFromQueue}
          />
        </div>
        <Button
          text="Очистить"
          onClick={clearQueue}
        />
      </div>
      <div className={styles.circle__container}>
        {stackQueue.map((char, index) => {
          return <Circle
            key={index}
            letter={char}
            index={index}/>
        })}
      </div>
    </SolutionLayout>
  );
};
