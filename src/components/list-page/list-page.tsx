import React, {useState, useEffect} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import styles from "./list-page.module.css"
import {Circle} from "../ui/circle/circle";
import {ArrowIcon} from "../ui/icons/arrow-icon";
import {ElementStates} from "../../types/element-states";
import {generateArray, generateData, ILinkedList, LinkedList, timer} from "./utils";

export type TList = {
  value: string;
  state: ElementStates;
  head: string | React.ReactElement | null;
  tail: string | React.ReactElement | null;
};

export const ListPage: React.FC = () => {
  const list = new LinkedList<string>(generateArray())

  const [inputValue, setInputValue] = useState<string>("")
  const [inputIndex, setInputIndex] = useState<number>(0)
  const [tempArray, setTempArray] = useState<ILinkedList<string>>(list)
  const [listArray, setListArray] = useState<TList[]>(generateData(tempArray.toArray()))
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

  const addToHead = async () => {   
    setAddToHeadButtonState({disabled: false, isLoading: true}) 
    let tempListArray = [...listArray];
    tempListArray[0].head = <Circle
        letter={inputValue}
        state={ElementStates.Changing}
        isSmall={true}/>
    setListArray([...tempListArray]);
    tempArray.prepend(inputValue);
    await timer();
    setTempArray(tempArray);
    tempListArray = generateData(tempArray.toArray());
    tempListArray[0].state = ElementStates.Modified;
    setListArray([...tempListArray]);
    await timer();
    setListArray([...generateData(tempArray.toArray())]);
    setInputIndex(0);
    setAddToHeadButtonState({disabled: false, isLoading: false})
  }

  const addToTail = async () => {
    setAddToTailButtonState({disabled: false, isLoading: true})    
    let tempListArray = [...listArray];
    tempListArray[tempListArray.length - 1].head = <Circle
        letter={inputValue}
        state={ElementStates.Changing}
        isSmall={true}/>
    setListArray([...tempListArray]);
    tempArray.append(inputValue);
    await timer();
    setTempArray(tempArray);
    tempListArray = generateData(tempArray.toArray());
    tempListArray[tempListArray.length - 1].state = ElementStates.Modified;
    setListArray([...tempListArray]);
    await timer();
    setListArray([...generateData(tempArray.toArray())]);    
    setInputIndex(0);
    setAddToTailButtonState({disabled: false, isLoading: false})
  }

  const removeFromHead = async () => {
    setRemoveFromHeadButtonState({disabled: false, isLoading: true})
    let tempListArray = [...listArray];
    tempListArray[0].tail = <Circle
      letter={tempListArray[0].value}
      state={ElementStates.Changing}
      isSmall={true}/>
    tempListArray[0].value = "";
    setListArray([...tempListArray]);
    await timer();
    tempArray.removeHead();
    setTempArray(tempArray);
    tempListArray = generateData(tempArray.toArray());
    setListArray([...tempListArray]);
    setRemoveFromHeadButtonState({disabled: false, isLoading: false})    
  }
  
  const removeFromTail = async () => {
    setRemoveFromTailButtonState({disabled: false, isLoading: true})
    let tempListArray = [...listArray];
    tempListArray[tempListArray.length - 1].tail = <Circle
      letter={tempListArray[tempListArray.length - 1].value}
      state={ElementStates.Changing}
      isSmall={true}/>
    tempListArray[tempListArray.length - 1].value = "";
    setListArray([...tempListArray]);
    await timer();
    tempArray.removeTail();
    setTempArray(tempArray);
    tempListArray = generateData(tempArray.toArray());
    setListArray([...tempListArray]);
    setRemoveFromTailButtonState({disabled: false, isLoading: false})
  }

  const addByIndex = async () => {
    setAddByIndexButtonState({disabled: false, isLoading: true})
    let tempListArray = [...listArray];    
    if (inputIndex === 0) {
      tempListArray[0].head = <Circle
        letter={tempListArray[0].value}
        state={ElementStates.Changing}
        isSmall={true}/>
      setListArray([...tempListArray]);
      tempArray.prepend(inputValue);
      await timer();
      setTempArray(tempArray);
      tempListArray = generateData(tempArray.toArray());
      tempListArray[0].state = ElementStates.Modified;
      setListArray([...tempListArray]);
      await timer();
      setListArray([...generateData(tempArray.toArray())]);
    } else {
      let current = tempArray.getHead();
      let currentIndex = 0;
      if(inputIndex) {
        while (currentIndex < inputIndex) {
          if (currentIndex - 1 >= 0) {
            tempListArray[currentIndex - 1].head = null;
            tempListArray[currentIndex - 1].state = ElementStates.Changing;
          }
          tempListArray[currentIndex].head = <Circle
            letter={tempListArray[currentIndex].value}
            state={ElementStates.Changing}
            isSmall={true}/>
          setListArray([...tempListArray]);
          await timer();
          currentIndex++;
          if (current?.next && currentIndex !== inputIndex) {
            current = current?.next;
          }
        }
      }      
      if (current) {
        if (currentIndex - 1 >= 0) {
          tempListArray[currentIndex - 1].head = null;
          tempListArray[currentIndex - 1].state = ElementStates.Changing;
        }
        tempListArray[currentIndex].head = <Circle
          letter={tempListArray[currentIndex].value}
          state={ElementStates.Changing}
          isSmall={true}/>
        setListArray([...tempListArray]);
        await timer();
        inputIndex && tempArray.insertAt(inputValue, inputIndex);
        setTempArray(tempArray);
        tempListArray = generateData(tempArray.toArray());
        setListArray([...tempListArray]);
        tempListArray[currentIndex].state = ElementStates.Modified;
        setListArray([...tempListArray]);
        await timer();
        setListArray([...generateData(tempArray.toArray())]);
      }
    }
    setInputValue("");
    setInputIndex(0);
    setAddByIndexButtonState({disabled: false, isLoading: false})
  }

  const removeByIndex = async () => {
    setRemoveByIndexButtonState({disabled: false, isLoading: true})
    let tempListArray = [...listArray];    
    const head = tempArray.getHead();
    if (inputIndex && inputIndex >= 0 && inputIndex < tempArray.getSize() && head) {
      let current = head;
      let currentIndex = 0;
      if (inputIndex === 0) {
        tempListArray[0].state = ElementStates.Changing;
        setListArray([...tempListArray]);
        await timer();
        tempListArray[0].state = ElementStates.Default;
        tempListArray[0].tail = <Circle
          letter={tempListArray[0].value}
          state={ElementStates.Changing}
          isSmall={true}/>
        tempListArray[0].value = "";
        setListArray([...tempListArray]);
        await timer();
        tempArray.removeHead();
        setTempArray(tempArray);
        tempListArray = generateData(tempArray.toArray());
        setListArray([...tempListArray]);
      } else {
        while (currentIndex < inputIndex) {
          tempListArray[currentIndex].state = ElementStates.Changing;
          setListArray([...tempListArray]);
          await timer();
          currentIndex++
          if (current.next) {
            current = current?.next;
          }
        }
        tempListArray[currentIndex].state = ElementStates.Changing;
        setListArray([...tempListArray]);
        await timer();
        tempListArray[currentIndex].state = ElementStates.Default;
        tempListArray[currentIndex].tail = <Circle
          letter={tempListArray[currentIndex].value}
          state={ElementStates.Changing}
          isSmall={true}/>
        tempListArray[currentIndex].value = "";
        setListArray([...tempListArray]);
        await timer();
        tempArray.removeFrom(inputIndex);
        setTempArray(tempArray);
        tempListArray = generateData(tempArray.toArray());
        setListArray([...tempListArray]);
      }
    }
    setInputIndex(0);
    setRemoveByIndexButtonState({disabled: false, isLoading: false})
  }

    useEffect(() => {
      if(!inputValue) {
        setAddToHeadButtonState({disabled: true, isLoading: false})
        setAddToTailButtonState({disabled: true, isLoading: false})
      } else {
        setAddToHeadButtonState({disabled: false, isLoading: false})
        setAddToTailButtonState({disabled: false, isLoading: false})
      }
      if(!inputValue || !inputIndex && inputIndex !== 0 || inputIndex > listArray.length - 1) {
        setAddByIndexButtonState({disabled: true, isLoading: false})
      } else {
        setAddByIndexButtonState({disabled: false, isLoading: false})
      }
      if(!inputIndex && inputIndex !== 0 || inputIndex > listArray.length - 1) {
        setRemoveByIndexButtonState({disabled: true, isLoading: false})
      } else {
        setRemoveByIndexButtonState({disabled: false, isLoading: false})
      }
      if(!listArray.length) {
        setRemoveFromHeadButtonState({disabled: true, isLoading: false})
        setRemoveFromTailButtonState({disabled: true, isLoading: false})
      } else {
        setRemoveFromHeadButtonState({disabled: false, isLoading: false})
        setRemoveFromTailButtonState({disabled: false, isLoading: false})
      }
    }, [inputIndex, inputValue, listArray.length])

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
            type="number"
            onChange={onChangeIndex}
            value={inputIndex}
            isLimitText={true}
            max={listArray.length - 1}/>
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
        {listArray.map((item, index, arr) => {
            return (
            <React.Fragment key={index}>
                <Circle
                  letter={item.value}
                  index={index}
                  state={item.state}
                  head={item.head}
                  tail={item.tail}
                  isSmall={false}/>
              {index < arr.length - 1 &&
                <ArrowIcon />
              }
            </React.Fragment>
            )
          })}
        </div>
      </SolutionLayout>
    );
  };
