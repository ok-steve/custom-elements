import { createElement, createElementFromString } from "./utils.js";

const template = createElementFromString(`
  <style>
    :host {
      display: block;
    }

    iframe {
      inline-size: 100%;
      block-size: 100%;
      aspect-ratio: var(--aspect-ratio, 16 / 9);
      border: 1px solid;
    }
  </style>
  <slot></slot>
`);

function createSrcdoc({ html, css, js, title }) {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale:1.0" />
        <title>${title}</title>
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
    if (this.codeTargets.length < 1) {
      return;
    }

    const preview = createElement("iframe", {
      srcdoc: createSrcdoc({
        ...this.code,
        title: this.title,
      }),
    });

    this.shadowRoot.append(preview, template.content.cloneNode(true));
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

    this.codeTargets?.forEach((target) => {
      const language = target
        .getAttribute("class")
        .split(" ")
        .filter((className) => className.startsWith("language-"))[0]
        .slice(9);

      code[language] = target.textContent;
    });

    return code;
  }

  get title() {
    return this.getAttribute("title")?.trim() || "Code Preview";
  }
}

if (!customElements.getName(CodePreviewElement)) {
  customElements.define("code-preview", CodePreviewElement);
}
