# OBS STREAMDECK CCREW

This repo is used by Knowit Creative Crew, to connect our stream deck to OBS and to control animations. To connect to OBS we have to communicate through websockets.

## Get started

Install dependencies with `$ yarn`
Start application with `$ node run.js`

## Development

The main code is in the run.js file. It needs some configuration for actions and appeareances, which is defined in its own configuration files. To decide which config to use, set the config variable in run.js.

### Configuration files - format

The configuration needs to be on the format below. The name is not used for anything other than to be descriptive for the developer (for now), the appearence can be either an image or a color, and one can configure actions both for key down and key up.

```
0: {
    name: "This is the config for key 0",
    appearance: {
      type: "image",
      info: path.resolve(__dirname, "path to image")
    },
    actionKeyDown: () => functionForKeyDown(),
    actionKeyUp: () => functionForKeyUp()
  },
  1: {
    name: "This is the config for key 1",
    appearance: {
      type: "color",
      info: [255, 0, 0]
    },
    actionKeyDown: () => functionForKeyDown(),
    actionKeyUp: () => functionForKeyUp()
  }

```

### Dependencies

The code uses this library: https://github.com/Lange/node-elgato-stream-deck
We communicate with OBS through https://obsproject.com/forum/resources/obs-websocket-remote-control-of-obs-studio-made-easy.466/
