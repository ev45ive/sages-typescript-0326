// oxlint-disable no-unused-vars
export {}

// Recursive inferred Types

const nesting = [1, [2, [3, [5, 6, [7, 'PLACKI' as const]]]]]
// const nesting = [1,'2'];
// const nesting = 1 ;
const flat = [1, 2, 3, 5, 6, 7, 'Placki']

type Flatten<T> = T extends Array<infer I> ? Flatten<I> : T

type f1 = Flatten<typeof nesting>

// Recursive type
type JSON =
  | string
  | number
  | Array<JSON>
  | {
      [k: string]: JSON
    }

// Type instantiation is excessively deep and possibly infinite.
// type f2 = Flatten<JSON[]>
