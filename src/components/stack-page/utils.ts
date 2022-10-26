export interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  clear: () => void;
  peak: () => T;
  getItems: () => T[];
  getSize: () => number;
}

export class Stack<T> implements IStack<T> {
  private container: T[] = [];
  push = (item: T) => {
    this.container.push(item);
  };
  pop = () => {
    this.container.pop();
  };
  clear = () => {
    this.container = [];
  };
  peak = ()=> {
    const arrayLength = this.getSize();
    return this.container[arrayLength - 1];
  };
  getItems = () => {
    return this.container;
  };
  getSize = () => this.container.length;
}

export const timer = () => {
  return new Promise((res) => {setTimeout(res, 500)
  })
}