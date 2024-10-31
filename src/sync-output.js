class SyncOutputElement extends HTMLOutputElement {
  connectedCallback() {
    ["input"].forEach((eventType) =>
      this.inputTargets.forEach((target) =>
        target.addEventListener(eventType, this)
      )
    );
  }

  disconnectedCallback() {
    ["input"].forEach((eventType) =>
      this.inputTargets.forEach((target) =>
        target.removeEventListener(eventType, this)
      )
    );
  }

  handleEvent(e) {
    this[`on${e.type}`](e);
  }

  oninput() {
    const values = this.inputTargets.map((el) => el.value);

    this.value = values.join(" ");
  }

  get inputTargets() {
    return Array.from(this.htmlFor)
      .map((id) => this.form.getElementById(id))
      .filter((el) => el !== null);
  }
}

if (!customElements.getName(SyncOutputElement)) {
  customElements.define("sync-output", SyncOutputElement, {
    extends: "output",
  });
}
