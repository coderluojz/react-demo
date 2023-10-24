import { useState } from './hooks/useState'

const StateWrapper = () => {
  const [count, setCount] = useState(0)
  const [count1, setCount1] = useState(0)
  return (
    <div>
      <h1>{count}</h1>
      <button
        onClick={() => {
          setCount(count + 1)
          console.log(count)
        }}
      >
        add
      </button>
      <h1>{count1}</h1>
      <button onClick={() => setCount1((count) => count + 1)}>add</button>
    </div>
  )
}

export default StateWrapper
