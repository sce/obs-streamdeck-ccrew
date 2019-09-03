#!/usr/bin/env node

const path = require("path");
const { execFile } = require("child_process");
const axios = require("axios");

const doExec = (...args) => {
  console.log(...args);
  // execFile(...args);
};

const url = "http://localhost:9090/nodecg-ccrew-rps/api";

const urlFor = (action, ...args) => `${url}/${action}?${args.join("&")}`;

const runRequest = (...args) => {
  const url = urlFor(...args);
  console.log("runRequest:", url);
  return axios
    .get(url)
    .then(res => console.log(res.status))
    .catch(res => console.error(res.message));
};

exports.rpsConfig = {
  0: {
    name: "Player 1, rock",
    appearance: {
      type: "image",
      info: path.resolve(__dirname, "rps-assets", "rps-left-rock.png")
    },
    actionKeyDown: () => runRequest("player1_hand", "data=rock"),
    actionKeyUp: () => console.log("undefined")
  },
  1: {
    name: "Reset game",
    appearance: {
      type: "color",
      info: [255, 0, 0]
    },
    actionKeyDown: () => runRequest("reset_game"),
    actionKeyUp: () => console.log("undefined")
  },
  2: {
    name: "Player 2, rock",
    appearance: {
      type: "image",
      info: path.resolve(__dirname, "rps-assets", "rps-right-rock.png")
    },
    actionKeyDown: () => runRequest("player2_hand", "data=rock"),
    actionKeyUp: () => console.log("undefined")
  },
  5: {
    name: "Player 1, scissor",
    appearance: {
      type: "image",
      info: path.resolve(__dirname, "rps-assets", "rps-left-scissors.png")
    },
    actionKeyDown: () => runRequest("player1_hand", "data=scissors"),
    actionKeyUp: () => console.log("undefined")
  },
  6: {
    name: "Finalize",
    appearance: {
      type: "color",
      info: [0, 255, 0]
    },
    actionKeyDown: () => runRequest("finalize"),
    actionKeyUp: () => console.log("undefined")
  },
  7: {
    name: "Player 2, scissor",
    appearance: {
      type: "image",
      info: path.resolve(__dirname, "rps-assets", "rps-right-scissors.png")
    },
    actionKeyDown: () => runRequest("player2_hand", "data=scissors"),
    actionKeyUp: () => console.log("undefined")
  },
  10: {
    name: "Player 1, paper",
    appearance: {
      type: "image",
      info: path.resolve(__dirname, "rps-assets", "rps-left-paper.png")
    },
    actionKeyDown: () => runRequest("player1_hand", "data=paper"),
    actionKeyUp: () => console.log("undefined")
  },
  12: {
    name: "Player 2, paper",
    appearance: {
      type: "image",
      info: path.resolve(__dirname, "rps-assets", "rps-right-paper.png")
    },
    actionKeyDown: () => runRequest("player2_hand", "data=paper"),
    actionKeyUp: () => console.log("undefined")
  }
};
