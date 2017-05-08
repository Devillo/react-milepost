export function setStyles (dom, styles) {
  Object.keys(styles)
    .forEach(style => {
      dom.style[style] = styles[style]
    })
}

export function setAttributes (dom, attrs) {
  Object.keys(attrs)
    .forEach(attr => {
      dom.setAttribute(attr, attrs[attr])
    })
}

export function createElementNS (type) {
  return document.createElementNS('http://www.w3.org/2000/svg', type)
}
