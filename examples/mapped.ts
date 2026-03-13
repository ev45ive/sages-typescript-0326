// oxlint-disable no-unused-vars
// ---------
// An index signature parameter type cannot be a literal type or generic type. Consider using a mapped object type instead

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
