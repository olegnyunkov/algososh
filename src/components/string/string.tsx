import React, {useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";

export const StringComponent: React.FC = () => {
  const inputStyles = {
    display: "flex",
    maxWidth: 522,
    justifyContent: "space-between",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 146
  };
  const circleStyles = {
    display: "flex",
    margin: "auto",
    maxWidth: 1040,
    justifyContent: "center"
  };

  const [inputText, setInputText] = useState<string>("");
  const [inputArray, setInputArray] = useState<string[]>([])
  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputText(e.target.value)
  };

  const onClick = () => {
    setInputArray(inputText.split(''))
    for(let i=0; i<inputArray.length/2; i++){
      let temp = inputArray[i];
      inputArray[i]=inputArray[inputArray.length-1-i];
      inputArray[inputArray.length-1-i]=temp;
    }
    return inputArray
  }

  console.log(inputArray)
  return (
    <SolutionLayout title="Строка">
      <div style={inputStyles}>
        <Input
          onInput={onChange}
          isLimitText={true}
          maxLength={11}/>
        <Button
          text="Развернуть"
          isLoader={false}
          onClick={onClick}/>
      </div>
      <div style={circleStyles}>
        {inputArray.map((char, index) => {
          return <Circle
            key={index}
            letter={char}/>
        })}
      </div>
    </SolutionLayout>
  );
};
