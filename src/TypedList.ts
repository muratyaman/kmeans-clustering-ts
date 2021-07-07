export class TypedList<T> {

  constructor(protected data: T[] = []) {
    // console.info('TypedList<' + this.constructor.name + '>', data);
    this.init();
  }

  init(): void {
    // do someting
  }

  assertData(): boolean {
    if (this.data.length <= 0) throw new Error('TypedList is empty');
    return true;
  }

  assertIndex(idx: number): boolean {
    if (!(idx in this.data)) throw new Error(`item not found at ${idx}`);
    return true;
  }

  clone(): TypedList<T> {
    return new TypedList<T>(this.items());
  }

  length(): number {
    return this.data.length;
  }

  reset() {
    this.data = [];
  }

  items(): T[] {
    return [...this.data];
  }

  item(idx: number): T {
    this.assertIndex(idx);
    return this.data[idx];
  }

  remove(idx: number): void {
    this.assertIndex(idx);
    this.data.splice(idx, 1); //in-place modification
  }

  appendCheck(item: T): void {
    // do something
  }

  append(item: T) {
    this.appendCheck(item);
    this.data.push(item);
  }

}
