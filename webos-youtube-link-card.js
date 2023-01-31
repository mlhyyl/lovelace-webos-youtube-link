class WebOSYouTubeLinkCard extends HTMLElement {
    setConfig(config) {

        this.config = config;
        if (!config.target || typeof this.config.target !== "string") {
            throw new Error('You need to paste a valid YouTube link');
        }
        this.render();
    }

    render() {
        if (!this.content) {
            this.card = document.createElement('ha-card');
            this.content = document.createElement('div');
            this.content.style.padding = '0 16px 16px';
            this.card.appendChild(this.content);
            this.appendChild(this.card);
        }
        this.card.header = this.config.title || "Watch on YouTube";
        let label = this.config.label || "Paste here"
        this.content.innerHTML = `
      <div style="display: flex">
        <paper-input style="flex-grow: 1" label="${label}">
        </paper-input>
      </div>
    `;
        this.content.querySelector("paper-input").addEventListener("value-changed", this.sendText.bind(this), false);
    }

    sendText() {
        let txt = this.content.querySelector("paper-input").value;
        if ( txt.startsWith("https://youtu.be/")) {
            txt = txt.replace("https://youtu.be/", "v=")
        }
        this.hass.callService("webostv", "command", {
            entity_id: this.config.target,
            command: "system.launcher/launch",
            payload: {
                id: "youtube.leanback.v4",
                contentId: txt,
            },
        });
        this.content.querySelector("paper-input").value = "";
    }
}

customElements.define('webos-youtube-link-card', WebOSYouTubeLinkCard);
