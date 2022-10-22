import React, {useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import styles from "./list-page.module.css"
import {Circle} from "../ui/circle/circle";
import {ArrowIcon} from "../ui/icons/arrow-icon";

export const ListPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<number>()
  const [inputIndex, setInputIndex] = useState<number>()
  const [listArray, setListArray] = useState<number[]>([])
  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(+e.target.value)
  }
  const onChangeIndex = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputIndex(+e.target.value)
  }

  const addToHead = () => {
    inputValue && listArray.unshift(inputValue);
    setListArray([...listArray]);
  }
  const addToTail = () => {
    inputValue && listArray.push(inputValue);
    setListArray([...listArray]);
  }
  const removeFromHead = () => {
    inputValue && listArray.shift();
    setListArray([...listArray]);
  }
  const removeFromTail = () => {
    inputValue && listArray.pop();
    setListArray([...listArray]);
  }
  const addByIndex = () => {
    inputValue && inputIndex && listArray.splice(inputIndex, 0, inputValue);
    setListArray([...listArray]);
  }
  const removeByIndex = () => {
    inputIndex && listArray.splice(inputIndex, 1);
    setListArray([...listArray]);
  }

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.list__controls}>
        <Input
          onChange={onChangeValue}/>
        <Button
          text="Добавить в head"
          onClick={addToHead}/>
        <Button
          text="Добавить в tail"
          onClick={addToTail}/>
        <Button
          text="Удалить из head"
          onClick={removeFromHead}/>
        <Button
          text="Удалить из tail"
          onClick={removeFromTail}/>
      </div>
      <div className={styles.list__controls}>
        <Input
          onChange={onChangeIndex}/>
        <Button
          text="Добавить по индексу"
        onClick={addByIndex}/>
        <Button
          text="Удалить по индексу"
        onClick={removeByIndex}/>
      </div>
      <div className={styles.circle__container}>
        {listArray.map((char, index) => {
          return (
            <>
              <Circle
                key={index}
                letter={char}
                index={index}/>
              <ArrowIcon/>
            </>
          )
        })}
      </div>
    </SolutionLayout>
  );
};
