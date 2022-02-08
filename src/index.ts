export default class FixedSizeArray<T> implements ReadonlyArray<T> {
  private _data: T[]

  constructor(length: number, fillValue: T | undefined = undefined) {
    this._data = new Array(length).fill(fillValue)

    return new Proxy(this, {
      get(object, key) {
        // typeof key === 'string' ensures key is not a symbol
        if (typeof key === 'string') {
          const index = Number(key)

          if (Number.isInteger(index)) {
            return object._data[index]
          }
        }

        return object[key as keyof ReadonlyArray<T>]
      },

      set(object, key, value: T) {
        // typeof key === 'string' ensures key is not a symbol
        if (typeof key === 'string') {
          const index = Number(key)

          if (Number.isInteger(index)) {
            if (index < 0 || index >= object._data.length) {
              throw new RangeError(
                `Index ${index} out of bounds, must be between 0 and ${object._data.length - 1}`
              )
            }
          }

          object._data[index] = value
          return true
        }

        return false
      }
    })
  }

  [n: number]: T

  get length(): number {
    return this._data.length
  }

  toNativeArray(): T[] {
    return [...this._data]
  }

  toString(): string {
    return this._data.toString()
  }

  toLocaleString(): string {
    return this._data.toLocaleString()
  }

  concat(...items: ConcatArray<T>[]): T[]
  concat(...items: (T | ConcatArray<T>)[]): T[]
  concat(...items: any[]): T[] {
    return this._data.concat(items)
  }

  join(separator?: string): string {
    return this._data.join(separator)
  }

  slice(start?: number, end?: number): T[] {
    return this._data.slice(start, end)
  }

  indexOf(searchElement: T, fromIndex?: number): number {
    return this._data.indexOf(searchElement, fromIndex)
  }

  lastIndexOf(searchElement: T, fromIndex?: number): number {
    return this._data.lastIndexOf(searchElement, fromIndex)
  }

  every<S extends T>(predicate: (value: T, index: number, array: readonly T[]) => value is S, thisArg?: any): this is readonly S[]
  every(predicate: (value: T, index: number, array: readonly T[]) => unknown, thisArg?: any): boolean
  every(predicate: any, thisArg?: any): boolean {
    return this._data.every(predicate, thisArg)
  }

  some(predicate: (value: T, index: number, array: readonly T[]) => unknown, thisArg?: any): boolean {
    return this._data.some(predicate, thisArg)
  }

  forEach(callbackfn: (value: T, index: number, array: readonly T[]) => void, thisArg?: any): void {
    this._data.forEach(callbackfn)
  }

  map<U>(callbackfn: (value: T, index: number, array: readonly T[]) => U, thisArg?: any): U[] {
    return this._data.map(callbackfn)
  }

  filter<S extends T>(predicate: (value: T, index: number, array: readonly T[]) => value is S, thisArg?: any): S[]
  filter(predicate: (value: T, index: number, array: readonly T[]) => unknown, thisArg?: any): T[]
  filter(predicate: any, thisArg?: any): T[] {
    return this._data.filter(predicate)
  }

  reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: readonly T[]) => T): T
  reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: readonly T[]) => T, initialValue: T): T
  reduce<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: readonly T[]) => U, initialValue: U): U
  reduce(callbackfn: any, initialValue?: any): T {
    return this._data.reduce(callbackfn, initialValue)
  }

  reduceRight(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: readonly T[]) => T): T
  reduceRight(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: readonly T[]) => T, initialValue: T): T
  reduceRight<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: readonly T[]) => U, initialValue: U): U
  reduceRight(callbackfn: any, initialValue?: any): T {
    return this._data.reduceRight(callbackfn, initialValue)
  }

  find<S extends T>(predicate: (this: void, value: T, index: number, obj: readonly T[]) => value is S, thisArg?: any): S | undefined
  find(predicate: (value: T, index: number, obj: readonly T[]) => unknown, thisArg?: any): T | undefined
  find(predicate: any, thisArg?: any): T | undefined {
    return this._data.find(predicate, thisArg)
  }

  findIndex(predicate: (value: T, index: number, obj: readonly T[]) => unknown, thisArg?: any): number {
    return this._data.findIndex(predicate, thisArg)
  }

  entries(): IterableIterator<[number, T]> {
    return this._data.entries()
  }

  keys(): IterableIterator<number> {
    return this._data.keys()
  }

  values(): IterableIterator<T> {
    return this._data.values()
  }

  includes(searchElement: T, fromIndex?: number): boolean {
    return this._data.includes(searchElement, fromIndex)
  }

  flatMap<U, This = undefined>(callback: (this: This, value: T, index: number, array: T[]) => U | readonly U[], thisArg?: This): U[] {
    return this._data.flatMap(callback, thisArg)
  }

  flat<A, D extends number = 1>(this: A, depth?: D): FlatArray<A, D>[] {
    return (this as unknown as this)._data.flat(depth) as FlatArray<A, D>[]
  }

  static from(arrayLike: ArrayLike<any> | Iterable<any>, mapfn?: (element: any, index: number) => any, thisArg?: any) : FixedSizeArray<any> {
    let array = Array.from(arrayLike)

    if (mapfn) {
      array = array.map(mapfn);
    }

    const fixedSizeArray = new FixedSizeArray(array.length)
    array.forEach((value: any, index: number) => {
      fixedSizeArray[index] = value;
    })

    return fixedSizeArray;
  }

  [Symbol.iterator](): IterableIterator<T> {
    return this._data[Symbol.iterator]()
  }
}
