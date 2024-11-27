import abcjs from "https://cdn.jsdelivr.net/npm/abcjs@6.4.4/+esm";

const ABC_OPTIONS = {
  responsive: "resize",
};

class RenderAbc extends HTMLElement {
  connectedCallback() {
    if (!this.code) {
      return;
    }

    abcjs.renderAbc(this, this.code, ABC_OPTIONS);
  }

  get codeTarget() {
    return this.querySelector('code[class~="language-abc"]');
  }

  get code() {
    return this.codeTarget?.textContent;
  }
}

if (!customElements.getName(RenderAbc)) {
  customElements.define("render-abc", RenderAbc);
}
