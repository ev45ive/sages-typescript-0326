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
