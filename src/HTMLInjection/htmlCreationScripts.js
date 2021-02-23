function setStyle(element, style) {
  element.style[style.property] = style.value;
}

export function applyStyles(element, styles) {
  styles.forEach((style) => setStyle(element, style));
}

export function createInnerElement(type, content) {
  let ele = document.createElement(type);
  ele.innerHTML = content;
  return ele;
}



