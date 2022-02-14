import FixedSizeArray from '.'

describe('FixedSizeArray', () => {
  type Dog = {
    name: string,
    weight: number
  }

  describe('constructor', () => {
    it('can create an array of numbers', () => {
      const array = new FixedSizeArray(3, 0)
      expect(array.toNativeArray()).toEqual([0, 0, 0])
    })

    it('can create an array of strings', () => {
      const array = new FixedSizeArray(4, '')
      expect(array.toNativeArray()).toEqual(['', '', '', ''])
    })

    it('can create an array of booleans', () => {
      const array = new FixedSizeArray(4, false)
      expect(array.toNativeArray()).toEqual([false, false, false, false])
    })

    it('can create an array of objects', () => {
      const array = new FixedSizeArray<Dog>(3, undefined)
      array[1] = { name: 'Riley', weight: 4 }
      expect(array.toNativeArray()).toEqual([
        undefined,
        { name: 'Riley', weight: 4 },
        undefined
      ])
    })
  })

  describe('[]', () => {
    it('can read array contents correctly', () => {
      const array = new FixedSizeArray(5, 0)
      array[3] = 29
      array[2] = 15
      expect(array[3]).toBe(29)
    })

    it('can assign array contents correctly', () => {
      const array = new FixedSizeArray(5, '')
      array[3] = 'dread'
      array[2] = 'woe'
      expect(array[3]).toBe('dread')
    })

    it('cannot assign array contents out of bounds', () => {
      const array = new FixedSizeArray<Dog>(5, undefined)
      expect(() => array[5] = { name: 'Mike', weight: 1 }).toThrow(RangeError)
    })

    it('yields undefined when reading elements out of bounds', () => {
      const array = new FixedSizeArray(5, '')
      expect(array[5]).toBeUndefined()
    })
  })

  describe('random native methods', () => {
    it('behaves like native arrays for method calls: map', () => {
      const array = new FixedSizeArray(5, '')
      expect(array.map((x, i) => i + 3)).toEqual([3, 4, 5, 6, 7])
    })

    it('behaves like native arrays for method calls: flat', () => {
      const array = new FixedSizeArray(5, [0, 0])
      array[0] = [1, 2]
      array[1] = [10, 22]
      array[2] = [20, 32]
      array[3] = [40, 42]
      array[4] = [50, 52]

      expect(array.flat()).toEqual([1, 2, 10, 22, 20, 32, 40, 42, 50, 52])
    })

    it('behaves like native arrays for method calls: slice', () => {
      const array = new FixedSizeArray(5, '')
      array[0] = 'moo'
      array[1] = 'coo'
      array[2] = 'foo'
      array[3] = 'too'
      array[4] = 'zoo'

      expect(array.slice(2)).toEqual(['foo', 'too', 'zoo'])
    })

    it('creates a Fixed Size Array using FixedSizeArray.from', () => {
      const array = FixedSizeArray.from('foo')
      expect(array.toNativeArray()).toEqual(['f', 'o', 'o'])
    })

    it('multiplies the array by 2 using FixedSizeArray.from', () => {
      const array = FixedSizeArray.from([1, 2, 3, 4, 5], x => x * 2)
      expect(array.toNativeArray()).toEqual([2, 4, 6, 8, 10])
    })

    it('creates a Fixed Size Array from Set', () => {
      const array = FixedSizeArray.from(new Set(['foo', 'bar', 'baz', 'foo']))
      expect(array.toNativeArray()).toEqual(['foo', 'bar', 'baz'])
    })

    it('creates a Fixed Size Array from Map', () => {
      const array = FixedSizeArray.from(new Map([['1', 'a'], ['2', 'b']]))
      expect(array.toNativeArray()).toEqual([['1', 'a'], ['2', 'b']])
    })
  })
})
