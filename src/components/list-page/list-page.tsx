import React, {ReactElement, useEffect, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import styles from "./list-page.module.css"
import {Circle} from "../ui/circle/circle";
import {ArrowIcon} from "../ui/icons/arrow-icon";
import {ElementStates} from "../../types/element-states";
import {nanoid} from "nanoid";

export type TArrElement = {
  letter: number | string | undefined | null;
  state: ElementStates;
  head: string | ReactElement;
  tail: string | ReactElement;
  isSmall: boolean;
}

export const ListPage: React.FC = () => {
  const arrElement: TArrElement = {
    letter: null,
    state: ElementStates.Default,
    head: "",
    tail: "",
    isSmall: false,
  }

  const generateRandomArray = (): TArrElement[] => {
    const array = [];
    for (let i = 0; i <= 3; i++) {
      const arrayNumbers = Math.floor(Math.random() * 100);
      array.push({
        letter: arrayNumbers,
        state: ElementStates.Default,
        head: "",
        tail: "",
        isSmall: false,
        id: null,
      })
    }
    return array
  }

  const [inputValue, setInputValue] = useState<number | string | undefined>("")
  const [inputIndex, setInputIndex] = useState<number | undefined>()
  const [listArray, setListArray] = useState<TArrElement[]>([...generateRandomArray()])
  const [addToHeadButtonState, setAddToHeadButtonState] = useState({disabled: false, isLoading: false})
  const [addToTailButtonState, setAddToTailButtonState] = useState({disabled: false, isLoading: false})
  const [removeFromHeadButtonState, setRemoveFromHeadButtonState] = useState({disabled: false, isLoading: false})
  const [removeFromTailButtonState, setRemoveFromTailButtonState] = useState({disabled: false, isLoading: false})
  const [addByIndexButtonState, setAddByIndexButtonState] = useState({disabled: false, isLoading: false})
  const [removeByIndexButtonState, setRemoveByIndexButtonState] = useState({disabled: false, isLoading: false})


  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }
  const onChangeIndex = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputIndex(+e.target.value)
  }

  const changeStateByAdd = async (element: TArrElement) => {
    await timer()
    element.state = ElementStates.Changing
    element.head = <Circle
      letter={inputValue}
      state={ElementStates.Changing}
      isSmall={true}/>
    setListArray([...listArray])
    element.head = ""
  }

  const changeStateByRemove = async (element: TArrElement) => {
    await timer()
    element.state = ElementStates.Changing
    setListArray([...listArray])
  }

  const timer = () => {
    return new Promise((res) => {
      setTimeout(res, 500)
    })
  }

  const addToHead: React.MouseEventHandler<HTMLButtonElement> = async () => {
    setAddToHeadButtonState({disabled: false, isLoading: true})
    listArray[0].head = <Circle
      letter={inputValue}
      state={ElementStates.Changing}
      isSmall={true}/>
    setListArray([...listArray]);
    await timer()
    arrElement.letter = inputValue
    inputValue && listArray.unshift(arrElement);
    listArray[0].state = ElementStates.Modified
    listArray[0].head = "head"
    listArray[1].head = ""
    setListArray([...listArray]);
    await timer()
    listArray[0].state = ElementStates.Default
    setListArray([...listArray]);
    setAddToHeadButtonState({disabled: false, isLoading: false})
  }

  const addToTail: React.MouseEventHandler<HTMLButtonElement> = async () => {
    setAddToTailButtonState({disabled: false, isLoading: true})
    listArray[listArray.length - 1].tail = <Circle
      letter={inputValue}
      state={ElementStates.Changing}
      isSmall={true}/>
    setListArray([...listArray]);
    await timer()
    arrElement.letter = inputValue
    inputValue && listArray.push(arrElement);
    listArray[listArray.length - 1].state = ElementStates.Modified
    listArray[listArray.length - 1].tail = "tail"
    listArray[listArray.length - 2].tail = ""
    setListArray([...listArray]);
    await timer()
    listArray[listArray.length - 1].state = ElementStates.Default
    setListArray([...listArray]);
    setAddToTailButtonState({disabled: false, isLoading: false})
  }

  const removeFromHead: React.MouseEventHandler<HTMLButtonElement> = async () => {
    setRemoveFromHeadButtonState({disabled: false, isLoading: true})
    listArray[0].head = <Circle
      letter={listArray[0].letter}
      state={ElementStates.Changing}
      isSmall={true}/>
    listArray[0].letter = null
    setListArray([...listArray]);
    await timer()
    listArray.shift();
    setListArray([...listArray]);
    setRemoveFromHeadButtonState({disabled: false, isLoading: false})
  }

  const removeFromTail: React.MouseEventHandler<HTMLButtonElement> = async () => {
    setRemoveFromTailButtonState({disabled: false, isLoading: true})
    listArray[listArray.length - 1].tail = <Circle
      letter={listArray[listArray.length - 1].letter}
      state={ElementStates.Changing}
      isSmall={true}/>
    listArray[listArray.length - 1].letter = null
    setListArray([...listArray]);
    await timer()
    listArray.pop();
    setListArray([...listArray]);
    setRemoveFromTailButtonState({disabled: false, isLoading: false})
  }

  const addByIndex: React.MouseEventHandler<HTMLButtonElement> = async () => {
    setAddByIndexButtonState({disabled: false, isLoading: true})
    if (inputIndex || inputIndex === 0) {
      for (let i = 0; i <= inputIndex - 1; i++) {
        await changeStateByAdd(listArray[i])
      }
    }
    await timer()
    if (inputIndex || inputIndex === 0) {
      listArray[inputIndex].head = <Circle
        letter={inputValue}
        state={ElementStates.Changing}
        isSmall={true}/>
      setListArray([...listArray]);
      await timer()
      arrElement.letter = inputValue
      listArray.splice(inputIndex, 0, arrElement);
      listArray[inputIndex + 1].head = ""
      listArray[inputIndex].state = ElementStates.Modified
      setListArray([...listArray]);
      await timer()
      for (let i = 0; i <= inputIndex - 1; i++) {
        listArray[i].state = ElementStates.Default
        setListArray([...listArray]);
        listArray[inputIndex].state = ElementStates.Default
        setListArray([...listArray]);
      }
      setAddByIndexButtonState({disabled: false, isLoading: false})
    }}

    const removeByIndex: React.MouseEventHandler<HTMLButtonElement> = async () => {
      setRemoveByIndexButtonState({disabled: false, isLoading: true})
      if (inputIndex || inputIndex === 0) {
        for (let i = 0; i <= inputIndex - 1; i++) {
          await changeStateByRemove(listArray[i])
        }
        await timer()
        listArray[inputIndex].tail = <Circle
          letter={listArray[inputIndex].letter}
          state={ElementStates.Changing}
          isSmall={true}/>
        setListArray([...listArray]);
        listArray[inputIndex].letter = null
        await timer()
        listArray.splice(inputIndex, 1);
        for (let i = 0; i <= inputIndex; i++) {
          listArray[i].state = ElementStates.Default
          setListArray([...listArray]);
        }
      }
      setRemoveByIndexButtonState({disabled: false, isLoading: false})
    }

    useEffect(() => {
      generateRandomArray()
    }, [])

    useEffect(() => {
      if(!inputValue || inputValue.toString().length > 4) {
        setAddToHeadButtonState({disabled: true, isLoading: false})
        setAddToTailButtonState({disabled: true, isLoading: false})
      } else {
        setAddToHeadButtonState({disabled: false, isLoading: false})
        setAddToTailButtonState({disabled: false, isLoading: false})
      }
      if(!inputIndex || inputIndex > listArray.length - 1 || !listArray.length) {
        setAddByIndexButtonState({disabled: true, isLoading: false})
        setRemoveByIndexButtonState({disabled: true, isLoading: false})
      } else {
        setAddByIndexButtonState({disabled: false, isLoading: false})
        setRemoveByIndexButtonState({disabled: false, isLoading: false})
      }
    }, [inputIndex, inputValue])

    return (
      <SolutionLayout title="Связный список">
        <div className={styles.list__controls}>
          <Input
            onChange={onChangeValue}
            value={inputValue}
            isLimitText={true}
            maxLength={4}
            max={4}/>
          <div className={styles.list__buttons}>
            <Button
              text="Добавить в head"
              onClick={addToHead}
              disabled={addToHeadButtonState.disabled}
              isLoader={addToHeadButtonState.isLoading}/>
            <Button
              text="Добавить в tail"
              onClick={addToTail}
              disabled={addToTailButtonState.disabled}
              isLoader={addToTailButtonState.isLoading}/>
            <Button
              text="Удалить из head"
              onClick={removeFromHead}
              disabled={removeFromHeadButtonState.disabled}
              isLoader={removeFromHeadButtonState.isLoading}/>
            <Button
              text="Удалить из tail"
              onClick={removeFromTail}
              disabled={removeFromTailButtonState.disabled}
              isLoader={removeFromTailButtonState.isLoading}/>
          </div>
        </div>
        <div className={styles.list__controls}>
          <Input
            onChange={onChangeIndex}
            value={inputIndex}
            isLimitText={true}
            maxLength={2}/>
          <Button
            text="Добавить по индексу"
            onClick={addByIndex}
            disabled={addByIndexButtonState.disabled}
            isLoader={addByIndexButtonState.isLoading}/>
          <Button
            text="Удалить по индексу"
            onClick={removeByIndex}
            disabled={removeByIndexButtonState.disabled}
            isLoader={removeByIndexButtonState.isLoading}/>
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
                <ArrowIcon
                  key={nanoid()}/>
              </>
            )
          })}
        </div>
      </SolutionLayout>
    );
  };
