import React, {useEffect, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {RadioInput} from "../ui/radio-input/radio-input";
import {Button} from "../ui/button/button";
import {Column} from "../ui/column/column";
import styles from "./sorting-page.module.css"
import {Direction} from "../../types/direction";
import {ElementStates} from "../../types/element-states";

export const SortingPage: React.FC = () => {
  const [sortingArray, setSortingArray] = useState<{index: number, state: ElementStates}[]>([])
  const [value, setValue] = useState<string>("select")

  const timer = () => {
    return new Promise((res) => {
      setTimeout(() => {
        res(null)
      }, 500)
    })
  }

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

  const changeCheckbox = (e: any) => {
    setValue(e.target.value)
  }

  const selectionAscSort = async () => {
    const arr = [...sortingArray]
    for (let i = 0, l = arr.length, k = l - 1; i < k; i++) {
      let indexMin = i;
      for (let j = i + 1; j < l; j++) {
        await timer()
        if (arr[indexMin].index > arr[j].index) {
          indexMin = j;
        }
        setSortingArray([...arr])
      }
      await timer()
      if (indexMin !== i) {
        [arr[i], arr[indexMin]] = [arr[indexMin], arr[i]];
      }
      setSortingArray([...arr])
    }
  };

  const selectionDescSort = async () => {
    const arr = [...sortingArray]
    for (let i = 0, l = arr.length, k = l - 1; i < k; i++) {
      let indexMin = i;
      for (let j = i + 1; j < l; j++) {
        await timer()
        if (arr[indexMin].index < arr[j].index) {
          indexMin = j;
        }
        setSortingArray([...arr]);
      }
      await timer()
      if (indexMin !== i) {
        [arr[i], arr[indexMin]] = [arr[indexMin], arr[i]];
      }
      setSortingArray([...arr])
    }
  }

  const bubbleAscSort = () => {
    const arr = [...sortingArray]
    for (let i = 0, endI = arr.length - 1; i < endI; i++) {
      let sorted = false;
      for (let j = 0, endJ = endI - i; j < endJ; j++) {
        if (arr[j].index > arr[j + 1].index) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          sorted = true;
        }
      }
      if (!sorted) break;
    }
    setSortingArray([...arr]);
  }

  const bubbleDescSort = () => {
    const arr = [...sortingArray]
    for (let i = 0, endI = arr.length - 1; i < endI; i++) {
      let sorted = false;
      for (let j = 0, endJ = endI + i; j < endJ; j++) {
        if (arr.indexOf(arr[j]) > arr.indexOf(arr[j - 1])) {
          [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
          sorted = true;
        }
      }
      if (!sorted) break;
    }
    setSortingArray([...arr]);
  }

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
            onClick={value === "select" ? selectionAscSort : bubbleAscSort}/>
          <Button
            text="По убыванию"
            sorting={Direction.Descending}
            onClick={value === "select" ? selectionDescSort : bubbleDescSort}/>
        </div>
        <Button
          text="Новый массив"
          onClick={generateRandomArray}/>
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
