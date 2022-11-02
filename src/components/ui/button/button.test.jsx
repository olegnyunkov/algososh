import React from "react";
import renderer from "react-test-renderer";
import {Button} from "./button";

it("button rendered", () => {
  const btn = renderer.create(<Button text={""}/>).toJSON();
  expect(btn).toMatchSnapshot();
});