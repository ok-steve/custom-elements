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
  });
}

export function memoize(fn) {
  const cache = new WeakMap();

  return (...args) => {
    const key = args.join(',');

    if (!cache.has(key)) {
      cache.set(key, fn(...args));
    }

    return cache.get(key);
  }
}
