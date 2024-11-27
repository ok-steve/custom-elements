import { cors, createElementFromString, memoize } from "./utils.js";

const getProviders = memoize(async (proxy) => {
  try {
    const response = await fetch(cors("https://oembed.com/providers.json", proxy));
    return response.json();
  } catch (err) {
    return [];
  }
});

class OEmbedElement extends HTMLElement {
  async connectedCallback() {
    if (!this.src) {
      return;
    }

    const source = new URL(this.src);
    const providers = await getProviders(this.proxy);

    const embedUrl = providers
      .filter(
        // eslint-disable-next-line-camelcase
        ({ provider_url }) => provider_url.includes(source.host)
      )
      .map(({ endpoints }) => cors(endpoints[0].url, this.proxy))[0];

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

  get proxy() {
    return this.getAttribute || "";
  }
}

if (!customElements.getName(OEmbedElement)) {
  customElements.define("o-embed", OEmbedElement);
}
