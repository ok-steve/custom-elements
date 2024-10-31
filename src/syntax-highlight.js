import { codeToHtml } from "https://cdn.jsdelivr.net/npm/shiki@1.22.2/+esm";
import { createElementFromString } from "./utils.js";

const template = createElementFromString(`
  <style>
    pre {
      margin-block: 0;
    }

    @media (prefers-color-scheme: dark) {
      .shiki,
      .shiki span {
        color: var(--shiki-dark) !important;
        background-color: var(--shiki-dark-bg) !important;
        /* Optional, if you also want font styles */
        font-style: var(--shiki-dark-font-style) !important;
        font-weight: var(--shiki-dark-font-weight) !important;
        text-decoration: var(--shiki-dark-text-decoration) !important;
      }
    }
  </style>
`);

class SyntaxHighlightElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    this.shadowRoot.append(template);

    const config = {
      lang: this.language,
    };

    if (this.theme.trim(" ").includes(" ")) {
      const [light, dark] = this.theme.trim(" ").split(" ");

      config.themes = {
        light,
        dark,
      };
    } else {
      config.theme = this.theme;
    }

    const html = await codeToHtml(this.code, config);
    this.shadowRoot.append(createElementFromString(html));
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
    return this.codeTarget.textContent;
  }

  get language() {
    return this.codeTarget
      .getAttribute("class")
      .split(" ")
      .filter((className) => className.startsWith("language-"))[0]
      .slice(9);
  }

  get theme() {
    return this.getAttribute("theme") || "solarized-light";
  }
}

if (!customElements.getName(SyntaxHighlightElement)) {
  customElements.define("syntax-highlight", SyntaxHighlightElement);
}
