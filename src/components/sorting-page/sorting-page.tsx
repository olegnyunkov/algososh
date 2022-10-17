import React, {useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {RadioInput} from "../ui/radio-input/radio-input";
import {Button} from "../ui/button/button";
import {Column} from "../ui/column/column";
import styles from "./sorting-page.module.css"

export const SortingPage: React.FC = () => {
  const [sortingArray, setSortingArray] = useState<number[]>([])

  const generateRandomArray = () => {
    const arrayLength = Math.floor(Math.random() * (17 - 3) + 3);
    const randomArray = [];
    for(let i = 0; i <= arrayLength; i++) {
      const arrayNumbers = Math.floor(Math.random() * 101);
      randomArray.push(arrayNumbers)
    }
    setSortingArray(randomArray)
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.sorting__controls}>
        <div className={styles.sorting__radio}>
          <RadioInput
            label="Выбор"
            defaultChecked/>
          <RadioInput
            label="Пузырёк"/>
        </div>
        <div className={styles.sorting__buttons}>
          <Button
            text="По возрастанию"/>
          <Button
            text="По убыванию"/>
        </div>
        <Button
          text="Новый массив"
          onClick={generateRandomArray}/>
      </div>
      <div className={styles.sorting__columns}>
        {sortingArray.map((item, index) => {
          return <Column
            key={index}
            index={item}/>
        })}
      </div>
    </SolutionLayout>
  );
};
