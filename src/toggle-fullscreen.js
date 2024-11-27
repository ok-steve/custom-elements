class ToggleFullscreen extends HTMLButtonElement {
  connectedCallback() {
    ["click"].forEach((eventName) => this.addEventListener(eventName, this));
  }

  disconnectedCallback() {
    ["click"].forEach((eventName) => this.removeEventListener(eventName, this));
  }

  handleEvent(e) {
    this[`on${e.type}`](e);
  }

  onclick() {
    const el = document.querySelector(this.getAttribute("commandfor"));

    if (el.requestFullscreen) {
      el.requestFullscreen()
    }
  }
}

if (!customElements.getName(ToggleFullscreen)) {
  customElements.define("toggle-fullscreen", ToggleFullscreen);
}
