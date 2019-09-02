#!/usr/bin/env node

const path = require('path');
const { execFile } = require('child_process');

const axios = require('axios');
const { openStreamDeck } = require('elgato-stream-deck');

// Automatically discovers connected Stream Decks, and attaches to the first one.
// Throws if there are no connected stream decks.
// You also have the option of providing the devicePath yourself as the first argument to the constructor.
// For example: const myStreamDeck = new StreamDeck('\\\\?\\hid#vid_05f3&pid_0405&mi_00#7&56cf813&0&0000#{4d1e55b2-f16f-11cf-88cb-001111000030}')
// Device paths can be obtained via node-hid: https://github.com/node-hid/node-hid
const myStreamDeck = openStreamDeck();

const doExec = (...args) => {
  console.log(...args);
  // execFile(...args);
};

// const url = 'http://localhost:9090/bundles/nodecg-ccrew-rps/graphics/api.html';
const url = 'http://localhost:9090/nodecg-ccrew-rps/api';

// urlFor('a=b', 'c=d')
// const urlFor = (...args) => `${url}?${args.join("&")}`;
// urlFor('some_action', 'c=d')
const urlFor = (action, ...args) => `${url}/${action}?${args.join("&")}`;

const runRequest = (...args) => {
  const url = urlFor(...args);
  console.log("runRequest:", url);
  return axios.get(url)
    //.then(res => console.log(res.data))
    .then(res => console.log(res.status))
    .catch(res => console.error(res.message));
};

const actions = {
  0: () => runRequest('player2_hand', 'data=rock'),
  5: () => runRequest('player2_hand', 'data=scissors'),
  10: () => runRequest('player2_hand', 'data=paper'),

  1: null,
  6: () => runRequest('finalize'),
  11: null,

  2: () => runRequest('reset_game'),
  7: () => runRequest('finalize'),
  12: null,

  3: () => runRequest('player2_hand', 'data=rock'),
  8: () => runRequest('player2_hand', 'data=scissors'),
  13: () => runRequest('player2_hand', 'data=paper'),

  4: () => runRequest('player1_hand', 'data=rock'),
  9: () => runRequest('player1_hand', 'data=scissors'),
  14: () => runRequest('player1_hand', 'data=paper'),
};

const assets = {
  0: path.resolve(__dirname, 'rps-assets', 'rps-right-rock.png'),
  5: path.resolve(__dirname, 'rps-assets', 'rps-right-scissors.png'),
  10: path.resolve(__dirname, 'rps-assets', 'rps-right-paper.png'),

  1: null,
  6: [0, 255, 0],
  11: null,

  2: [255, 0, 0],
  7: [0, 255, 0],
  12: null,

  3: path.resolve(__dirname, 'rps-assets', 'rps-right-rock.png'),
  8: path.resolve(__dirname, 'rps-assets', 'rps-right-scissors.png'),
  13: path.resolve(__dirname, 'rps-assets', 'rps-right-paper.png'),

  4: path.resolve(__dirname, 'rps-assets', 'rps-left-rock.png'),
  9: path.resolve(__dirname, 'rps-assets', 'rps-left-scissors.png'),
  14: path.resolve(__dirname, 'rps-assets', 'rps-left-paper.png'),
};

myStreamDeck.on('down', keyIndex => {
  const action = actions[keyIndex];
  if (action) {
    action();
  } else {
    console.log('unconfigured key down:', keyIndex);
  }
});

myStreamDeck.on('up', keyIndex => {
	console.log('key %d up', keyIndex);
});

myStreamDeck.on('error', error => {
	console.error(error);
});

// Fill the second button from the left in the first row with an image of the GitHub logo.
// This is asynchronous and returns a promise.
// myStreamDeck.fillImageFromFile(3, path.resolve(__dirname, 'github_logo.png')).then(() => {
// 	console.log('Successfully wrote a GitHub logo to key 3.');
// });

//myStreamDeck.fillPanel(path.resolve(__dirname, 'cc-nopadding.png')).then(() => {
// myStreamDeck.fillPanel(path.resolve(__dirname, '5.png')).then(() => {
// 	console.log('Successfully wrote a logo to panel.');
// });


const promises = [...Array(15).keys()]
  .map(num => (
    myStreamDeck.fillImageFromFile(num, path.resolve(__dirname, '5.png'))
      .then(() => console.log(`Successfully wrote a some logo to key ${num}.`))
  ));

// the above icons are async, so wait for them to finish :-P
Promise.all(promises).then(() => {
  //return Promise.all(Object.keys(assets).map(i => {
  return Promise.all([...Array(15).keys()].map(i => {
    const val = assets[i];
    if (val == null) {
      // ignore
      return Promise.resolve();
    } else if (Array.isArray(val)) {
      myStreamDeck.fillColor(i, ...val);
      console.log(i, val);
      return Promise.resolve();
    } else {
      return myStreamDeck.fillImageFromFile(i, val)
        .then(() => console.log("fillImage:", i, val))
        .catch(err => console.log("FAILED", val, err));
    }
  }));
})
  .then(() => console.log("ready!"));

// Fill the first button form the left in the first row with a solid red color. This is synchronous.
// myStreamDeck.fillColor(4, 255, 0, 0);
//console.log('Successfully wrote a red square to key 4.');
