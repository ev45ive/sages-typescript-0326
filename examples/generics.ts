// oxlint-disable no-unused-expressions
// oxlint-disable no-unused-vars
export {}

type Box = { value: any }

const b: Box = { value: '' }
b.value = 'asd' as 'bannaa'
b.value.królik.z.kapeusza()

// ----

type TypedBox<T> = { value: T }

const b2: TypedBox<string> = { value: '' }
b2.value = ''
b2.value // string

// ---
// Useless generics - <T> - types relation

declare function parseJSON<T>(json: string): T
/*            */ JSON.parse('') as {}

declare function serializeJSON<T>(obj: T): string
/*            */ JSON.stringify('') // string

//

function identity<T>(id: T): T {
  return id
}

// ---

function takeFirst<T>(arr: T[]): T | undefined {
  return arr[0]
}

const r1 = takeFirst<string>(['123'])
const r2 = takeFirst([]) // <never>
const r3 = takeFirst(['asd']) // <string >
const r4 = takeFirst(['asd', 123]) // <string | number>

const r5: boolean = takeFirst([true])!

// ---
