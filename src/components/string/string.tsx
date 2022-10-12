import React, {useState} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";

export const StringComponent: React.FC = () => {
  const styles = {
    display: "flex",
    maxWidth: 522,
    justifyContent: "space-between",
    margin: "auto"
  }

  const [inputText, setInputText] = useState<string>("")

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {setInputText(e.target.value)}
  console.log(inputText)

  return (
    <SolutionLayout title="Строка">
      <div style={styles}>
        <Input
          onInput={onChange}
          isLimitText={true}
          maxLength={11}/>
        <Button text="Развернуть"/>
      </div>
      <Circle/>
    </SolutionLayout>
  );
};
