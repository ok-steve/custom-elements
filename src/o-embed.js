import { cors, createElementFromString } from "./utils.js";

async function getProviders() {
  try {
    const response = await fetch(cors("https://oembed.com/providers.json"));
    return response.json();
  } catch (err) {
    return [];
  }
}

const PROVIDERS = getProviders();

class OEmbedElement extends HTMLElement {
  async connectedCallback() {
    if (!this.src) {
      return;
    }

    const source = new URL(this.src);
    const providers = await PROVIDERS;

    const embedUrl = providers
      .filter(
        // eslint-disable-next-line-camelcase
        ({ provider_url }) => provider_url.includes(source.host)
      )
      .map(({ endpoints }) => endpoints[0].url)[0];

    if (!embedUrl) {
      return;
    }

    const params = new URLSearchParams({ url: this.src });
    const request = await fetch(`${embedUrl}?${params.toString()}`);
    const { html } = await request.json();

    this.append(createElementFromString(html));
  }

  /**
   * Getters/Setters
   */

  get src() {
    return this.getAttribute('src');
  }
}

if (!customElements.getName(OEmbedElement)) {
  customElements.define("o-embed", OEmbedElement);
}
