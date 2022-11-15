import React from "react";
import {swap} from "./utils";

const evenArray = [5, 35, 8, 10]
const expectedEvenArray = [10, 8, 35, 5]
const oddArray = [7, 10, 1, 67, 5]
const expectedOddArray = [5, 67, 1, 10, 7]

describe("Correctly swap characters: ", () => {

  const evenTest = (array) => {
    let start = 0;
    let end = array.length - 1;
    while(end >= start) {
      swap(array, start, end)
      start++
      end--
    }
    return array
  }

  it("with even number of chars", () => {
    expect(evenTest(evenArray)).toEqual(expectedEvenArray)
  })

  it("with odd number of chars", () => {
    expect(evenTest(oddArray)).toEqual(expectedOddArray)
  })

  it("with single char", () => {
    expect(evenTest(["g"])).toEqual(["g"])
  })

  it("with no chars", () => {
    expect(evenTest([])).toEqual([])
  })
})