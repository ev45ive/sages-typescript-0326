// oxlint-disable no-unused-vars
export {}

type Box = { value: any }

const b: Box = { value: '' }
b.value = 'asd' as 'bannaa'
b.value.królik.z.kapeusza()

// ----

type TypedBox<T> = { value: T }

const b2: TypedBox<string> = { value: '' }
