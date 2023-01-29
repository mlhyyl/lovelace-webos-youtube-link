# WebOS YouTube Link Card for Lovelace/Home Assistant

This simple card allows you to use your phone or PC keyboard to paste a YouTube link aand watch it on your LG WebOS TV.

The native [Home Assistant WebOS Integration](https://www.home-assistant.io/integrations/webostv/) is required.

## Install
### Install via HACS
1. Go to the "Frontend"-tab in HACS
2. Click on "Explore & Add Repositories"
3. Search for `WebOS youtube`
5. Click "Install this Repository in HACS"

### Manual install
1. Copy the `webos-youtube-link-card.js` file to your `config/www` folder
2. Add a reference in the resoruce config:

```
resources:
  - url: /local/webos-youtube-link-card.js
    type: module
```

## Config
Example config:

```
type: custom:webos-youtube-keyboard-card
target: media_player.living_room_tv
title: ' '
label: Paste YouTube link here
```

- `target` is the entity id of the WebOS TV media player
- `label` is optional and controlls the placeholder text
- `title` is optional and controlles the card title
