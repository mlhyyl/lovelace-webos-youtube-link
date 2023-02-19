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
        if ( txt == "") {
            return
        }
        else if ( txt.startsWith("https://youtu.be/")) {
            txt = txt.replace("https://youtu.be/", "v=")
            txt = txt.substring(0, txt.lastIndexOf('?t='))
            
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
        else if ( txt.startsWith("https://www.youtube.com/") ) {
            txt = txt.replace("https://www.youtube.com//watch?", "")
            txt = txt.substring(0, txt.lastIndexOf('?t='))
            
            this.hass.callService("webostv", "command", {
                entity_id: this.config.target,
                command: "system.launcher/launch",
                payload: {
                    id: "youtube.leanback.v4",
                    contentId: txt,
                },
            });
            this.content.querySelector("paper-input").value = "";
            console.log("Link submitted")
        }
    }
}

customElements.define('webos-youtube-link-card', WebOSYouTubeLinkCard);
