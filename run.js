#!/usr/bin/env node

const path = require("path");
const { execFile } = require("child_process");
const axios = require("axios");
const { openStreamDeck } = require("elgato-stream-deck");
const sharp = require("sharp");

// Automatically discovers connected Stream Decks, and attaches to the first one.
const myStreamDeck = openStreamDeck();

const config = {
  0: {
    name: "Start stream",
    appearance: {
      type: "image",
      info: path.resolve(
        __dirname,
        "font-awesome_4-7-0_chevron-circle-right.png"
      )
    },
    actionKeyDown: () => console.log("Start stream"),
    actionKeyUp: () => console.log("Stream started")
  },

  1: {
    name: "Stop stream",
    appearance: {
      type: "image",
      info: path.resolve(__dirname, "font-awesome_4-7-0_stop-90.png")
    },
    actionKeyDown: () => console.log("Stop stream"),
    actionKeyUp: () => console.log("Stream stopped")
  },

  2: {
    name: "Console log out color",
    appearance: {
      type: "color",
      info: [238, 49, 245]
    },
    actionKeyDown: () => console.log("pressed color"),
    actionKeyUp: () => console.log("released color")
  },

  8: {
    name: "",
    appearance: {
      type: "fds",
      info: [50, 168, 82]
    },
    actionKeyDown: () => console.log("pressed 0"),
    actionKeyUp: () => console.log("released 0")
  }
};

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
