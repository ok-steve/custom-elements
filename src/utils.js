export function createElement(tag, props = {}, ...children) {
  const element = document.createElement(tag);

  if (children) {
    element.append(...children);
  }

  return Object.assign(element, props);
}

export function createElementFromString(text) {
  return createElement('template', {
    innerHTML: text,
  }).content.cloneNode(true);
}
