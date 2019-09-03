#!/usr/bin/env node
const path = require("path");

// const url = 'http://localhost:9090/bundles/nodecg-ccrew-rps/graphics/api.html';

exports.standardConfig = {
  0: {
    name: "Start stream",
    appearance: {
      type: "image",
      info: path.resolve(
        __dirname,
        "icons",
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
      info: path.resolve(__dirname, "icons", "font-awesome_4-7-0_stop-90.png")
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
