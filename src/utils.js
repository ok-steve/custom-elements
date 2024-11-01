export function cors(url, proxy = "https://corsproxy.io?") {
  return `${proxy}${encodeURIComponent(url)}`;
}

export function createElement(tag, props = {}, ...children) {
  const element = document.createElement(tag);

  if (children) {
    element.append(...children);
  }

  return Object.assign(element, props);
}

export function createElementFromString(text) {
  return createElement("template", {
    innerHTML: text,
  }).content.cloneNode(true);
}
