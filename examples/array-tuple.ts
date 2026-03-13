// oxlint-disable unicorn/no-useless-spread
// oxlint-disable no-unused-vars
export {}

const t1: string[] = []
const t2: Array<string> = []
const t3 = [123, '123']

const tablica1 = [123, 'Zbigniew', 'Banan', true]
const tablica2 = [123, 'Zbigniew', 'Banan', true] as const

const tablica3: [number, string, string, boolean] = [123, 'Zbigniew', 'Banan', true]

const tablica4: [string] = ['asd'] // n-tuple
const tablica5: string[] = ['awd'] // array

type Person = [id: number, name: string]
const p: Person = [123, 'Jan']

type Result = [data: string, error?: Error]
type useState = [value: string, setValue: Function]

const arr = [...[12, 23]]
type Params = [...Result, ...Person]

//  makePerson(id: number, name: string): Person
declare function makePerson(...params: Person): Person
declare function makePerson2(x: '', ...params: Person): Person
declare function makePerson4(...res: Params): Person
