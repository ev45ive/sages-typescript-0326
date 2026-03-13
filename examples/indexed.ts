// oxlint-disable no-unused-vars
export {}

type User = {
  readonly id: string
}

const u = { id: '', banana: '' } as User
u.id.toString()
// u.id = ''
// u.banana = ''

// type Dictionary = object
// type Dictionary = {}

// dict.x ; // error
// dict = undefined // !{}
// dict = null // !{}
// dict = 123 // !object
// dict = 'null' // !object

const dynamicKeys = {
  id: '',
  [u.id + '_']: '',
  [`item_${Date.now()}`]: '',
}

type Dictionary = {
  [key: string]: string | undefined
}
const dict: Dictionary = {}

dict['haslo 1'] = '123'
dict['haslo 2'] = '123'
dict.banana = '123'

dict['sdf']?.toString() // safe read
