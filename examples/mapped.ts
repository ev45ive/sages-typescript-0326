// oxlint-disable no-unused-vars
// ---------
// An index signature parameter type cannot be a literal type or generic type. Consider using a mapped object type instead
export {}

type TeamColors = 'red' | 'blue'

// for team in teams { team.score }
type Scores = {
  [color in TeamColors]: { color: color; score: number }
}

// ---

const teams = [
  {
    name: 'Reds',
    color: 'red',
  },
  {
    name: 'Blues',
    color: 'blue',
  },
] as const

type Teams = typeof teams
type TeamsColors = Teams[number]['color']

type TeamPlayers = {
  [color in TeamsColors]?: { color: color; players: [] }
}
const players: TeamPlayers = {
  blue: {
    color: 'blue',
    players: [],
  },
}

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

// Lookup
type AlbumId = Album['id']
type AlbumImage = Album['images'][number]

// Mapped
type keys = keyof Album

// type PartialAlbum = {
//   [k in keys]?: Album[k]
// }

// type PartialAlbum = {
//   [k in keyof Album]?: Album[k]
// }

// function(T){ for (key in T) ... }

// type Partial<T> = {
//   [k in keyof T]?: T[k]
// }

type PartialAlbum = Partial<Album>
