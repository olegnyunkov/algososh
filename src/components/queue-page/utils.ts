export interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  peak: () => T | null;
  getItems: () => (T | null)[];
  clear: () => void;
  getSize: () => number;
  getLength: () => number;
  getHead: () => number;
  getTail: () => number;
}

export class Queue<T> implements IQueue<T> {
  private container: (T | null)[] = [];
  private head = 0;
  private tail = 0;
  private length = 0;
  private readonly size: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size);
  }
  enqueue = (item: T) => {
    if (!this.isEmpty()) {
      this.tail = (this.tail + 1) % this.size;
    }
    this.container[this.tail % this.size] = item;
    this.length++;
  };
  dequeue = () => {
    this.container[this.head % this.size] = null
    this.head = (this.head + 1) % this.size;
    this.length--;
    if (this.isEmpty()) {
      this.head = 0;
      this.tail = 0;
    }
  };
  peak = (): T | null => {
    return this.container[this.head % this.size];
  };
  isEmpty = () => this.length === 0;
  getItems = () => {
    return this.container;
  }
  clear = () => {
    this.container = Array(this.size);
    this.head = 0;
    this.tail = 0;
    this.length = 0;
  }
  getSize = () => {
    return this.size;
  }
  getLength = () => {
    return this.length;
  }
  getHead = () => {
    return this.head;
  }
  getTail = () => {
    return this.tail;
  }
}

export const timer = () => {
  return new Promise((res) => {setTimeout(res, 500)
  })
}