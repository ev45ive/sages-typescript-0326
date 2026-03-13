// oxlint-disable no-unused-vars
export {}

type events = 'click' | 'keyup'
type DOMEvents = `on${events}`
type ReactEvents = `on${Capitalize<events>}` //  "onClick" | "onKeyup"

type EventTypes = {
  click: MouseEvent
  keyup: KeyboardEvent
}

// ------------
// type props = {
//   onClick: {}
//   onKeyup: {}
// }

type EventMap = {
  [e in events]: `on${Capitalize<e>}` // { click: "onClick"; ... }
}

type EventHandlers = {
  [event in events]?: (e: EventTypes[event]) => void
}

// ---------

// type AllowedHeaders = 'Accept' | 'Authorization' // Choice
// type AllowedHeaders = 'Accept' | 'Authorization' | string // string

// type AllowedHeaders = 'Accept' | 'Authorization' | `${'A' | 'B'}` // "Accept" | "Authorization" | "A" | "B"
// type AllowedHeaders = 'Accept' | 'Authorization' | `X-${string}` // Template union
// type AllowedHeaders = 'Accept' | 'Authorization' | (string & {})

type AutoComplete = string & {}
type AllowedHeaders = 'Accept' | 'Authorization' | AutoComplete

type RequestConfig = {
  headers: {
    // [h in AllowedHeaders]?: string
    [h in AllowedHeaders]: string
  }
}

const req: RequestConfig = {
  headers: {
    Accept: '',
    Authorization: '',
    banana: 'OK',
  },
}
