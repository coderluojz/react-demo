import { root } from '..'

let states = []
let stateSetters = []

let stateIndex = 0

async function render() {
  const App = (await import('../App')).default
  stateIndex = 0
  console.log(states[stateIndex])
  root.render(<App />)
}

const createState = (initialState, stateIndex) => {
  return states[stateIndex] ? states[stateIndex] : initialState
}
const createStateSetter = (stateIndex) => {
  return (newState) => {
    if (typeof newState === 'function') {
      states[stateIndex] = newState(states[stateIndex])
    } else {
      states[stateIndex] = newState
    }
    render()
  }
}

export function useState(initialState) {
  states[stateIndex] = createState(initialState, stateIndex)

  if (!stateSetters[stateIndex]) {
    stateSetters.push(createStateSetter(stateIndex))
  }

  const _state = states[stateIndex]
  const _setState = stateSetters[stateIndex]

  stateIndex++

  return [_state, _setState]
}
