import { createElement, createElementFromString } from "./utils.js";

const template = createElementFromString(`
  <style>
    :host {
      display: block;
    }

    iframe {
      aspect-ratio: var(--aspect-ratio, 16 / 9);
      border: 1px solid;
      width: 100%;
    }
  </style>
  <slot></slot>
`);

function createSrcdoc({ html, css, js }) {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale:1.0" />
        <title>Code Preview</title>
        ${css ? `<style>${css}</style>` : ""}
        ${js ? `<script type="module">${js}</script>` : ""}
      </head>
      <body>
        ${html}
      </body>
    </html>
  `;
}

class CodePreviewElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const preview = createElement('iframe', {
      srcdoc: createSrcdoc(this.code),
    });

    this.shadowRoot.append(preview, template);
  }

  /**
   * Targets
   */

  get codeTargets() {
    return this.querySelectorAll("code");
  }

  /**
   * Getters/Setters
   */

  get code() {
    const code = {};

    this.codeTargets.forEach((target) => {
      const language = target
        .getAttribute("class")
        .split(" ")
        .filter((className) => className.startsWith("language-"))[0]
        .slice(9);

      code[language] = target.textContent;
    });

    return code;
  }
}

if (!customElements.getName(CodePreviewElement)) {
  customElements.define("code-preview", CodePreviewElement);
}
