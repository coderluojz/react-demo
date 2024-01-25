import { useRef } from 'react'
import useNextInput from './hooks/useNextInput'

const NextInput = () => {
  const ref = useRef(null)

  useNextInput(ref)

  return (
    <div ref={ref}>
      <input type="text" enterKeyHint="next" />
      <input type="text" enterKeyHint="next" />
      <input type="text" enterKeyHint="next" />
      <input type="text" enterKeyHint="next" />
      <input type="text" enterKeyHint="next" />
      <input type="text" enterKeyHint="next" />
    </div>
  )
}

export default NextInput
