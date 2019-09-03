#!/usr/bin/env node

const { openStreamDeck } = require("elgato-stream-deck");
const sharp = require("sharp");
const { standardConfig } = require("./standardConfig");
const { rpsConfig } = require("./rpsConfig");

const config = rpsConfig;

// Automatically discovers connected Stream Decks, and attaches to the first one.
const myStreamDeck = openStreamDeck();

const fillImageHelper = (number, resolvedPath) => {
  sharp(resolvedPath)
    .flatten() // Eliminate alpha channel, if any.
    .resize(myStreamDeck.ICON_SIZE, myStreamDeck.ICON_SIZE) // Scale up/down to the right size, cropping if necessary.
    .raw() // Give us uncompressed RGB.
    .toBuffer()
    .then(buffer => {
      myStreamDeck.fillImage(number, buffer);
    })
    .catch(err => {
      console.error(err);
    });
};

const setUpApperences = () => {
  [...Array(15).keys()].map(keyNumber => {
    const conf = config[keyNumber];
    if (conf && conf.appearance) {
      switch (conf.appearance.type) {
        case "image":
          fillImageHelper(keyNumber, conf.appearance.info);
          break;
        case "color":
          myStreamDeck.fillColor(
            keyNumber,
            conf.appearance.info[0],
            conf.appearance.info[1],
            conf.appearance.info[2]
          );
          break;
        default:
          myStreamDeck.fillColor(keyNumber, 0, 0, 0);
      }
    } else {
      myStreamDeck.fillColor(keyNumber, 0, 0, 0);
    }
  });
};

setUpApperences();

// Functions for dealing with key presses
myStreamDeck.on("down", keyIndex => {
  const action = config[keyIndex] && config[keyIndex].actionKeyDown;
  action
    ? action()
    : console.log("No defined key down action for index:", keyIndex);
});

myStreamDeck.on("up", keyIndex => {
  const action = config[keyIndex] && config[keyIndex].actionKeyUp;
  action
    ? action()
    : console.log("No defined key up action for index:", keyIndex);
});

myStreamDeck.on("error", error => {
  console.error(error);
});
