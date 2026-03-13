// oxlint-disable no-unused-vars
export {}

// Conditional Types

type Point = { x: number; y: number }
type Vector = { x: number; y: number; length: number }

// wynik = warunek ? prawda : falsz
type IsPointAVector = Point extends Vector ? 'banana' : 'placki' // placki  >=
type IsVectorAPoint = Vector extends Point ? 'true' : 'false' // true     <=
type IsPointAPoint = Point extends Point ? true : false // true ==

// ----

type AextendsB1 = 'banana' | 'placki' extends string ? 1 : 0
type AextendsB2 = 'banana' extends 'banana' | 'placki' ? 1 : 0

type MergeUnions = 'banana' | 'banana' | 'placki' | never | never extends 'banana' | 'placki'
  ? 1
  : 0

// ---

//  Distributive over unions - 2 * ( 3 + 4 + 5 ) -> (2*3 + 2*4 + ... )

// type ExludeBanana<T> = T extends 'banana' | 'bananas' ? 'placki' : never
type ExludeBanana<T> = T extends 'banana' | 'bananas' ? never : T

type NoBananas = ExludeBanana<'banana' | 'bananas' | 'kiwi'> // never | never | kiwi

// ---

type Exclude<T, U> = T extends U ? never : T
type Extract<T, U> = T extends U ? T : never

type OnlyStrings = Extract<'banana' | 'plack' | 123 | true, string>

type OmitStrict<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>

type o = Omit<{ x: 1; y: 2 }, 'x' | 'z'>

// Draft = Omit<Entity,'id'>

// ---

// Exercise: Extract keys by type
type Example = { id: number; name: string; surname: string }
type Expected = {
  name: string
  surname: string
}
type Equal<A, B> =
  (<T>() => T extends A ? 1 : 0) extends <T>() => T extends B ? 1 : 0 ? true : false

function assertType<A, B, E = 'Types are not equal'>(
  ..._: Equal<A, B> extends true ? [] : [error: E]
): void {}

// { name: never }
type ExtractByType1<T, VT> = {
  [k in keyof T]: T[k] extends VT ? k : never
}
type e0 = ExtractByType1<Example, string>

// never | "name" | "surname"
type ExtractByType2<T, VT> = ExtractByType1<T, VT>[keyof T]

type e1 = ExtractByType2<Example, string>

type ExtractType<T, VT> = Pick<T, ExtractByType2<T, VT>>

type e2 = ExtractType<Example, string> extends Expected ? true : 'Error'

const Check1: Equal<e2, true> = true

assertType<ExtractType<Example, string>, Expected, 'This is bad...'>()
