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

const admin = { name: 'admin' }
const person = { name: 'person', age: 23 }
const bot = { name: 'Chatb0t', model: 'gpt99' }

// T ⊆ { name: unknown }
function getUserName<T extends { name: unknown }>(user: T): T['name'] {
  return user.name
}

// function getUserName2<T>({ name }: { name: T }) {

function getUserName2({ name }: { name: string }) {
  return name
}

// Generic Constraints
function printUserNameAndReturn<T extends { name: string }>(user: T) {
  console.log(`Hello ${user.name}`)

  return user
}

// ----

function mergeObjects<X, Y>(a: X, b: Y): X & Y {
  return { ...a, ...b }
}

// ---

function getProperty<T extends object>(obj: T, key: keyof T) {
  return obj[key]
}
getProperty(bot, 'model')

// ---

type Album = {
  album_type: string
  total_tracks: number
  available_markets: string[]
  external_urls: {
    spotify: string
  }
  href: string
  id: string
  images: {
    url: string
    height: number
    width: number
  }[]
  name: string
  release_date: string
  release_date_precision: string
  restrictions: {}
  type: string
}

type Partial<T> = {
  [k in keyof T]?: T[k]
}

// type Pick<T, K extends keyof T> = { [k in K]: T[k] }
type A = Pick<Album, 'images' | 'name'>
