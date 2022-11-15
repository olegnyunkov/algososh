import React from "react";
import renderer from "react-test-renderer";
import {Button} from "./button";
import {fireEvent, render, screen} from "@testing-library/react";

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
});

it("button click works correctly", () => {
  window.alert = jest.fn()
  render(<Button text={"Кнопка"} />)
  const btn = screen.getByText("Кнопка")
  fireEvent.click(btn)
})
