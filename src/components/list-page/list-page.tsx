import React, {useEffect, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import styles from "./list-page.module.css"
import {Circle} from "../ui/circle/circle";
import {ArrowIcon} from "../ui/icons/arrow-icon";
import {ElementStates} from "../../types/element-states";

export type TArrElement = {
  letter: number | null;
  state: ElementStates;
  head: string;
  tail: string;
  isSmall: boolean;
  id: number | null;

}

export const ListPage: React.FC = () => {
  const arrElement: TArrElement = {
    letter: Math.floor(Math.random()*100),
    state: ElementStates.Default,
    head: "",
    tail: "",
    isSmall: false,
    id: null,
  }
  // const startArray: number[] = [0, 34, 8, 1]
  const array: TArrElement[] = Array.from({length: 4}, () => arrElement)


  const [inputValue, setInputValue] = useState<number>()
  const [inputIndex, setInputIndex] = useState<number>()
  const [listArray, setListArray] = useState<TArrElement[]>([...array])

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(+e.target.value)
  }
  const onChangeIndex = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputIndex(+e.target.value)
  }


  const timer = () => {
    return new Promise((res) => {
      setTimeout(() => {
        res(null)
      }, 500)
    })
  }

  const addToHead = () => {
    //@ts-ignore
    arrElement.letter = inputValue
    //@ts-ignore
    arrElement.head = <Circle
      letter={inputValue}
      state={ElementStates.Changing}
      isSmall={true}/>
    arrElement.state = ElementStates.Modified
    inputValue && listArray.unshift(arrElement);
    setListArray([...listArray]);
  }
  const addToTail = () => {
    //@ts-ignore
    arrElement.letter = inputValue
    inputValue && listArray.push(arrElement);
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
    //@ts-ignore
    arrElement.letter = inputValue
    inputIndex && listArray.splice(inputIndex, 0, arrElement);
    setListArray([...listArray]);
  }
  const removeByIndex = () => {
    inputIndex && listArray.splice(inputIndex, 1);
    setListArray([...listArray]);
  }
  console.log(array)
  return (
    <SolutionLayout title="Связный список">
      <div className={styles.list__controls}>
        <Input
          onChange={onChangeValue}/>
        <div className={styles.list__buttons}>
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
        {listArray.map((item, index) => {
          return (
            <>
              <Circle
                key={index}
                letter={item.letter}
                index={index}
                state={item.state}
                head={item.head}
                tail={item.tail}
                isSmall={item.isSmall}/>
              <ArrowIcon/>
            </>
          )
        })}
      </div>
    </SolutionLayout>
  );
};
