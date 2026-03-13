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
