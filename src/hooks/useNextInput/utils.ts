function isVisible(node) {
  if (getComputedStyle(node).visibility === 'hidden') {
    return false
  }
  while (node !== document.body) {
    if (node.style.display === 'none' || node.style.opacity === '0') {
      return false
    }
    node = node.parentNode
  }
  return true
}

// 判断可用输入框
function isAvailableNode(node) {
  if (
    node.tagName === 'INPUT' &&
    !node.disabled &&
    isVisible(node) &&
    !['submit', 'reset', 'file', 'hidden', 'checkbox', 'radio'].includes(node.type)
  ) {
    return true
  } else if (node.tagName === 'TEXTAREA' && !node.disabled) {
    return true
  }
  return false
}
function findFirstAvailableInput(rootDom, selector) {
  let nodes = [...rootDom.querySelectorAll(selector)]

  for (let i = 0; i < nodes.length; i++) {
    let node = nodes[i]
    if (['INPUT', 'TEXTAREA'].includes(node.tagName)) {
      if (isAvailableNode(node)) {
        return node
      }
    } else {
      let childNodes = node.querySelectorAll('input, textarea')
      let childNode = [...childNodes].find((node) => isAvailableNode(node))
      if (childNode) {
        return childNode
      }
    }
  }
  return null
}

// 查找所有输入框
function findAllInputs(rootDom, selector: string) {
  return [...rootDom.querySelectorAll(selector)].reduce(function (nodes, node) {
    if (['INPUT', 'TEXTAREA'].includes(node.tagName)) {
      if (isAvailableNode(node)) {
        nodes.push(node)
      }
      return nodes
    }
    let childNodes = [...node.querySelectorAll(selector)].filter((node) => isAvailableNode(node))
    if (childNodes.length) {
      nodes.push(...childNodes)
      return nodes
    }
    return nodes
  }, [])
}

// 自动聚焦第一个
export function autoFocus(rootDom) {
  let selector = 'input, textarea'
  let node = findFirstAvailableInput(rootDom, selector)
  if (node) {
    node.focus()
  }
}
// 查找下一个节点
export function findNextNode(rootDom, targetNode) {
  let selector = 'input, textarea'
  let nodes = findAllInputs(rootDom, selector)
  let isByCompare = false
  let index = nodes.findIndex((item, index) => {
    // 查找当前节点
    if (item === targetNode || item.contains(targetNode)) {
      return true
    }
    // 查找下一个节点
    if (targetNode.compareDocumentPosition(item) & Node.DOCUMENT_POSITION_FOLLOWING) {
      isByCompare = true
      return true
    }
    return false
  })
  if (isByCompare) {
    return nodes[index]
  } else {
    if (index === -1 || index === nodes.length - 1) {
      return null
    }
    return nodes[index + 1]
  }
}
