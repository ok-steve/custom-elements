export function createElement(tag, props = {}, ...children) {
  const element = document.createElement(tag);

  if (children) {
    element.append(...children);
  }

  return Object.assign(element, props);
}

export function createElementFromString(text) {
  const template = document.createElement("template");
  template.innerHTML = text;
  return template.content.cloneNode(true);
}
