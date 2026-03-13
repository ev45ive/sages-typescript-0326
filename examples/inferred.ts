export {}

// oxlint-disable no-unused-vars
// Exercise: Extract  GeolocationPosition from geolocation API
// const coords: GeolocationPosition[]
// not exported GeolocationPosition

window.navigator.geolocation.getCurrentPosition((res) => {
  const mojeCors: GeolocationCoordinates = res.coords
  //   const mojeCors: ? = res.coords;
})

type PosFn = (typeof window)['navigator']['geolocation']['getCurrentPosition']

// type PositionCallback = PosFn extends (...p: infer F) => any ? F[0] : 0
type PositionCallback = PosFn extends (p: infer F) => any ? F : 0

type Parameters<T> = T extends (...params: infer Params) => any ? Params : never
type ReturnType<T> = T extends (...params: any) => infer ReturnT ? ReturnT : never

type res = Parameters<PositionCallback>[0]
type coords = res['coords']

// ---

// Exercise: Extracting return values ( of return values )
function fetchPlacki(type: string) {
  return window
    .fetch('http://fabrykaplackow.com/', {})
    .then((r) => r.json())
    .then((d) => ({ placek: d, sos: d.sos }))
}
// fetchPlacki().then(value => {})

type PromiseR = ReturnType<typeof fetchPlacki>
type R = PromiseR extends Promise<infer V> ? V : never
type R2 = Awaited<PromiseR>
