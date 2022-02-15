# @psse-cpu/fixed-size-array

### :warning: :warning: Might contain bugs, do not use

JS/TS package to emulate fixed-size arrays from C/C++/Java and even Dart.  
Only used in SE-1222 (Data Structures) exercises.  Not for production use.

### Getting started

##### Installing
`npm i @psse-cpu/fixed-size-array`

##### Using
```ts
let array = new FixedSizeArray(5, 0)
array[0] = 13
array[1] = 235
array[2] = 111
array[3] = 21
array[4] = 15

console.log('The array', array.toNativeArray())

let stringArray = new FixedSizeArray(5, '')

class Dog { /* ... */ }

let objectArray = new FixedSizeArray<Dog>(5, undefined)

let usingFrom = FixedSizeArray.from([1, 9, 2])
usingFrom[3] = 60 // won't work
```

### Alternatives

`Object.seal` can also mimic fixed-size arrays, but silently failing in some
illegal operations may trip off beginners.

```js
let x = Object.seal([1, 2, 3])
// x = [ 1, 2, 3 ]

x[3] = 99
// silently fails
```

### Why?

The goal is to ue only one language for the newest batch Yechezkel, JS/TS, 
allow them to master one, and just switch later on as needed.

https://youtu.be/CjVFSWchhEo?t=294

Unfortunately, JS has no fixed-size array, and to create data structures from
scratch (especially array lists), this package is provided.

### TODO

- more tests
- ESLint
- Prettier
- `FixedSizeArray.from`

## PRs and bug reports welcome!
