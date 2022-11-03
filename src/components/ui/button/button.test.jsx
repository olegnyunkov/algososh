import React from "react";
import renderer from "react-test-renderer";
import {Button} from "./button";

describe("button rendered: ", () => {

  it("without text", () => {
    const btn = renderer.create(<Button />).toJSON();
    expect(btn).toMatchSnapshot();
  });

  it("with text", () => {
    const btn = renderer.create(<Button text={"Кнопка"}/>).toJSON();
    expect(btn).toMatchSnapshot();
  });

  it("with disabled state", () => {
    const btn = renderer.create(<Button disabled={true}/>).toJSON();
    expect(btn).toMatchSnapshot();
  });

  it("with loading state", () => {
    const btn = renderer.create(<Button isLoader={true}/>).toJSON();
    expect(btn).toMatchSnapshot();
  });
})
