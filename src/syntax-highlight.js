import Prism from "https://cdn.jsdelivr.net/npm/prismjs@1.29.0/+esm";
import "https://cdn.jsdelivr.net/npm/prismjs@1.29.0/plugins/autoloader/prism-autoloader.min.js";
import { createElement } from "./utils.js";

const CDN_BASE_URL = "https://cdn.jsdelivr.net/npm/prismjs@1.29.0";

Prism.manual = true;
Prism.plugins.autoloader.languages_path = `${CDN_BASE_URL}/components/`;

class SyntaxHighlightElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    if (!this.code) {
      return;
    }

    const themes = Array.isArray(this.theme) ? this.theme : [this.theme];

    const styles = themes.map((theme, i) => {
      const props = {
        rel: "stylesheet",
        href: `${CDN_BASE_URL}/themes/${
          theme === "prism" ? theme : `prism-${theme}`
        }.min.css`,
      };

      if (themes.length > 1) {
        props.media = `(prefers-color-scheme: ${i % 2 ? "dark" : "light"})`;
      }

      return createElement("link", props);
    });

    // Clone children to preserve the original element outside the Shadow DOM
    const children = Array.from(this.children).map((child) =>
      child.cloneNode(true)
    );

    this.shadowRoot.append(...styles, ...children);

    Prism.highlightAllUnder(this.shadowRoot);
  }

  /**
   * Targets
   */

  get codeTarget() {
    return this.querySelector("code");
  }

  /**
   * Getters/Setters
   */

  get code() {
    return this.codeTarget?.textContent;
  }

  get language() {
    return this.codeTarget
      .getAttribute("class")
      .split(" ")
      .filter((className) => className.startsWith("language-"))[0]
      .slice(9);
  }

  get theme() {
    const theme = this.getAttribute("theme")?.trim() || "solarizedlight";

    return theme.includes(" ") ? theme.split(" ") : theme;
  }
}

if (!customElements.getName(SyntaxHighlightElement)) {
  customElements.define("syntax-highlight", SyntaxHighlightElement);
}
