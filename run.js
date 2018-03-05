#!/usr/bin/env node

const path = require('path');
const StreamDeck = require('elgato-stream-deck');

const { execFile } = require('child_process');

// Automatically discovers connected Stream Decks, and attaches to the first one.
// Throws if there are no connected stream decks.
// You also have the option of providing the devicePath yourself as the first argument to the constructor.
// For example: const myStreamDeck = new StreamDeck('\\\\?\\hid#vid_05f3&pid_0405&mi_00#7&56cf813&0&0000#{4d1e55b2-f16f-11cf-88cb-001111000030}')
// Device paths can be obtained via node-hid: https://github.com/node-hid/node-hid
const myStreamDeck = new StreamDeck();

myStreamDeck.on('down', keyIndex => {
  switch (keyIndex) {
    case 0: {
	    console.log('STARTING OBS');
      break;
    }
    case 5: {
	    console.log('START/STOP RECORDING');
      execFile('xdotool', ['key', '--delay', '100', 'alt+d']);
      break;
    }
    case 10: {
	    console.log('START/STOP RECORDING');
      execFile('xdotool', ['key', '--delay', '100', 'alt+d']);
      break;
    }
    default:
	    console.log('key %d down', keyIndex);
      break;
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

[...Array(15).keys()].forEach(num => {
  myStreamDeck.fillImageFromFile(num, path.resolve(__dirname, '5.png')).then(() => {
    console.log(`Successfully wrote a some logo to key ${num}.`);
  });
});

setTimeout(() => {
  // the above icons are async, so wait for them to finish :-P
  myStreamDeck.fillImageFromFile(0, path.resolve(__dirname, 'Open_Broadcaster_Software_Logo-90.png')).then(() => {
    console.log(`Successfully added OBS-logo.`);
  });

  myStreamDeck.fillImageFromFile(10, path.resolve(__dirname, 'record-90.png')).then(() => {
    console.log(`Record.`);
  });

  myStreamDeck.fillImageFromFile(5, path.resolve(__dirname, 'font-awesome_4-7-0_stop-90.png')).then(() => {
    console.log(`Stop.`);
  });

  myStreamDeck.fillImageFromFile(4, path.resolve(__dirname, 'font-awesome_4-7-0_chevron-circle-left-90.png')).then(() => {
    console.log(`Left-arrow.`);
  });

  myStreamDeck.fillImageFromFile(9, path.resolve(__dirname, 'font-awesome_4-7-0_chevron-circle-right-90.png')).then(() => {
    console.log(`Right-arrow.`);
  });

  myStreamDeck.fillImageFromFile(14, path.resolve(__dirname, 'font-awesome_4-7-0_exchange-90.png')).then(() => {
    console.log(`Exchange.`);
  });

}, 1000);

// Fill the first button form the left in the first row with a solid red color. This is synchronous.
// myStreamDeck.fillColor(4, 255, 0, 0);
//console.log('Successfully wrote a red square to key 4.');
