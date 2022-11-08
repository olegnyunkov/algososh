import React from "react";
import renderer from "react-test-renderer";
import {fireEvent, render, screen} from "@testing-library/react";
import {Circle} from "./circle";
import {ElementStates} from "../../../types/element-states";

describe("circle rendered: ", () => {

  it("without letter",() => {
    const circle = renderer.create(<Circle />)
    expect(circle).toMatchSnapshot()
  });

  it("with letter",() => {
    const circle = renderer.create(<Circle letter={"55fh"}/>)
    expect(circle).toMatchSnapshot()
  });

  it("with head",() => {
    const circle = renderer.create(<Circle head={"head"}/>)
    expect(circle).toMatchSnapshot()
  });

  it("with component in head",() => {
    const circle = renderer.create(<Circle head={<Circle letter={"23fg"} isSmall={true}/>}/>)
    expect(circle).toMatchSnapshot()
  });

  it("with tail",() => {
    const circle = renderer.create(<Circle tail={"tail"}/>)
    expect(circle).toMatchSnapshot()
  });

  it("with component in tail",() => {
    const circle = renderer.create(<Circle tail={<Circle letter={"dfg4"} isSmall={true}/>}/>)
    expect(circle).toMatchSnapshot()
  });

  it("with default state",() => {
    const circle = renderer.create(<Circle state={ElementStates.Default}/>)
    expect(circle).toMatchSnapshot()
  });

  it("with changing state",() => {
    const circle = renderer.create(<Circle state={ElementStates.Changing}/>)
    expect(circle).toMatchSnapshot()
  });

  it("with modified state",() => {
    const circle = renderer.create(<Circle state={ElementStates.Modified}/>)
    expect(circle).toMatchSnapshot()
  });
})