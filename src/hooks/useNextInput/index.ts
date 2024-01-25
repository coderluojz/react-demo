import { MutableRefObject, useCallback, useEffect } from 'react'
import { autoFocus, findNextNode } from './utils'

type NextInputProps = {
  keyCode?: number
  autoFocusFirst?: boolean
}

// input 更改键盘文本下一项： enterKeyHint="next"
type ElType = MutableRefObject<HTMLElement | null> | string
const useNextInput = (ref: ElType, options?: NextInputProps) => {
  const { keyCode = 13, autoFocusFirst = false } = options ?? {}
  const getElement = useCallback(
    () => {
      let el = null;
      if (!ref) return
      if (typeof ref === 'string') {
        el = document.getElementById(el)
      } else {
        el = ref.current
      }
      return el;
    },
    [ref],
  )

  const keyDown = useCallback(
    (event: KeyboardEvent) => {
      console.log(keyCode);
      event.preventDefault()
      if (event.keyCode !== keyCode) {
        return
      }
      let targetNode = event.target as HTMLElement
      if (targetNode?.tagName === 'TEXTAREA') {
        return
      }
      const el = getElement()
      let nextNode = findNextNode(el, targetNode)
      if (!nextNode) {
        return
      }
      setTimeout(() => {
        nextNode.focus()
      })
    },
    [keyCode, getElement],
  )

  useEffect(() => {
    if (!autoFocusFirst) return
    const el = getElement()
    if (!el) return;
    setTimeout(() => {
      autoFocus(el)
    });
  }, [autoFocusFirst, getElement])


  useEffect(() => {
    const el = getElement()
    if (!el) return;
    el.addEventListener('keydown', keyDown)
    return () => el.removeEventListener('keydown', keyDown)
  }, [keyDown, getElement])

}

export default useNextInput
