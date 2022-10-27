import React, {useEffect, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {RadioInput} from "../ui/radio-input/radio-input";
import {Button} from "../ui/button/button";
import {Column} from "../ui/column/column";
import styles from "./sorting-page.module.css"
import {Direction} from "../../types/direction";
import {ElementStates} from "../../types/element-states";
import {swapChars, timer} from "./utils";

export const SortingPage: React.FC = () => {
  const [sortingArray, setSortingArray] = useState<{index: number, state: ElementStates}[]>([]);
  const [value, setValue] = useState<string>("select");
  const [ascButtonState, setAscButtonState] = useState<{disabled: boolean, isLoading: boolean}>({disabled: false, isLoading: false});
  const [descButtonState, setDescButtonState] = useState<{disabled: boolean, isLoading: boolean}>({disabled: false, isLoading: false});
  const [resetButtonState, setResetButtonState] = useState<{disabled: boolean, isLoading: boolean}>({disabled: false, isLoading: false});

  const generateRandomArray = () => {
    const arrayLength = Math.floor(Math.random() * (17 - 3) + 3);
    const randomArray = [];
    for (let i = 0; i <= arrayLength; i++) {
      const arrayNumbers = Math.floor(Math.random() * 101);
      randomArray.push({index: arrayNumbers, state: ElementStates.Default})
    }
    setSortingArray(randomArray)
  }

  useEffect(() => {
    generateRandomArray()
  }, [])

  const changeCheckbox: React.FormEventHandler<HTMLInputElement> = (e) => {
    setValue(e.currentTarget.value)
  }

  const selectionAscSort: React.MouseEventHandler<HTMLButtonElement> = async () => {
    setAscButtonState({disabled: false, isLoading: true})
    const arr = [...sortingArray]
    for (let i = 0; i < arr.length - 1; i++) {
      let indexMin = i;
      arr[indexMin].state = ElementStates.Changing;
      setSortingArray([...arr])
      for (let j = i + 1; j < arr.length; j++) {
        arr[j].state = ElementStates.Changing;
        setSortingArray([...arr])
        await timer()
        if (arr[indexMin].index > arr[j].index) {
          indexMin = j;
        }
        arr[j].state = ElementStates.Default;
        setSortingArray([...arr])
      }
      swapChars(arr, i, indexMin)
      arr[indexMin].state = ElementStates.Default
      arr[i].state = ElementStates.Modified
      setSortingArray([...arr])
      await timer()
    }
    arr[arr.length - 1].state = ElementStates.Modified
    setAscButtonState({disabled: false, isLoading: false})
  };

  const selectionDescSort: React.MouseEventHandler<HTMLButtonElement> = async () => {
    setDescButtonState({disabled: false, isLoading: true})
    const arr = [...sortingArray]
    for (let i = 0; i < arr.length - 1; i++) {
      let indexMin = i;
      arr[indexMin].state = ElementStates.Changing;
      setSortingArray([...arr])
      for (let j = i + 1; j < arr.length; j++) {
        arr[j].state = ElementStates.Changing;
        setSortingArray([...arr])
        await timer()
        if (arr[indexMin].index < arr[j].index) {
          indexMin = j;
        }
        arr[j].state = ElementStates.Default;
        setSortingArray([...arr])
      }
      swapChars(arr, i, indexMin)
      arr[indexMin].state = ElementStates.Default
      arr[i].state = ElementStates.Modified
      setSortingArray([...arr])
      await timer()
    }
    arr[arr.length - 1].state = ElementStates.Modified
    setDescButtonState({disabled: false, isLoading: false})
  }

  const bubbleAscSort: React.MouseEventHandler<HTMLButtonElement> = async () => {
    setAscButtonState({disabled: false, isLoading: true})
    const arr = [...sortingArray]
    for(let i = 0; i < arr.length; i++) {
      for(let j = 0; j < arr.length - i - 1; j++) {
        arr[j].state = ElementStates.Changing;
        arr[j + 1].state = ElementStates.Changing;
        setSortingArray([...arr]);
        await timer();
        if (arr[j].index > arr[j + 1].index) {
          swapChars(arr, j, j + 1);
          setSortingArray([...arr]);
          await timer();
        }
        arr[j].state = ElementStates.Default;
        arr[j + 1].state = ElementStates.Default;
        setSortingArray([...arr]);
      }
      arr[arr.length - i - 1].state = ElementStates.Modified;
      setSortingArray([...arr]);
      await timer();
    }
    setAscButtonState({disabled: false, isLoading: false})
  }

  const bubbleDescSort: React.MouseEventHandler<HTMLButtonElement> = async () => {
    setDescButtonState({disabled: false, isLoading: true})
    const arr = [...sortingArray]
    for(let i = 0; i < arr.length; i++) {
      for(let j = 0; j < arr.length - i - 1; j++) {
        arr[j].state = ElementStates.Changing;
        arr[j + 1].state = ElementStates.Changing;
        setSortingArray([...arr]);
        await timer();
        if (arr[j].index < arr[j + 1].index) {
          swapChars(arr, j, j + 1);
          setSortingArray([...arr]);
          await timer();
        }
        arr[j].state = ElementStates.Default;
        arr[j + 1].state = ElementStates.Default;
        setSortingArray([...arr]);
      }
      arr[arr.length - i - 1].state = ElementStates.Modified;
      setSortingArray([...arr]);
      await timer();
    }
    setDescButtonState({disabled: false, isLoading: false})
  }

  useEffect(() => {
    if(ascButtonState.isLoading) {
      setDescButtonState({disabled: true, isLoading: false})
      setResetButtonState({disabled: true, isLoading: false})
    } else if (descButtonState.isLoading) {
      setAscButtonState({disabled: true, isLoading: false})
      setResetButtonState({disabled: true, isLoading: false})
    } else {
      setAscButtonState({disabled: false, isLoading: false})
      setDescButtonState({disabled: false, isLoading: false})
      setResetButtonState({disabled: false, isLoading: false})
    }
  }, [ascButtonState.isLoading, descButtonState.isLoading])

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.sorting__controls}>
        <div className={styles.sorting__radio}>
          <RadioInput
            label="Выбор"
            value="select"
            checked={value === "select"}
            onChange={changeCheckbox}/>
          <RadioInput
            label="Пузырёк"
            value="bubble"
            checked={value === "bubble"}
            onChange={changeCheckbox}/>
        </div>
        <div className={styles.sorting__buttons}>
          <Button
            text="По возрастанию"
            sorting={Direction.Ascending}
            onClick={value === "select" ? selectionAscSort : bubbleAscSort}
            disabled={ascButtonState.disabled}
            isLoader={ascButtonState.isLoading}/>
          <Button
            text="По убыванию"
            sorting={Direction.Descending}
            onClick={value === "select" ? selectionDescSort : bubbleDescSort}
            disabled={descButtonState.disabled}
            isLoader={descButtonState.isLoading}/>
        </div>
        <Button
          text="Новый массив"
          onClick={generateRandomArray}
          disabled={resetButtonState.disabled}
          isLoader={resetButtonState.isLoading}/>
      </div>
      <div className={styles.sorting__columns}>
        {sortingArray.map((item, index) => {
          return <Column
            key={index}
            index={item.index}
            state={item.state}/>
        })}
      </div>
    </SolutionLayout>
  );
};
