#!/usr/bin/env node

const path = require('path');
const { execFile } = require('child_process');

const axios = require('axios');
const StreamDeck = require('elgato-stream-deck');

// Automatically discovers connected Stream Decks, and attaches to the first one.
// Throws if there are no connected stream decks.
// You also have the option of providing the devicePath yourself as the first argument to the constructor.
// For example: const myStreamDeck = new StreamDeck('\\\\?\\hid#vid_05f3&pid_0405&mi_00#7&56cf813&0&0000#{4d1e55b2-f16f-11cf-88cb-001111000030}')
// Device paths can be obtained via node-hid: https://github.com/node-hid/node-hid
const myStreamDeck = new StreamDeck();

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

myStreamDeck.on('down', keyIndex => {
  switch (keyIndex) {
    case 0: {
	    console.log('STUDIO MODE');
      runRequest('set_round_win', 'data=1');
      break;
    }
    case 1: {
	    console.log('STARTING OBS');
      runRequest('set_round_win', 'data=2');
      break;
    }
    case 2: {
	    console.log('BLUE TEAM');
      runRequest('reset_game');
      break;
    }
    case 3: {
	    console.log('INTRO');
      runRequest('player2_hand', 'data=rock');
      break;
    }
    case 4: {
	    console.log('PREVIOUS SCENE');
      runRequest('player1_hand', 'data=rock');
      break;
    }
    case 5: {
	    console.log('START/STOP RECORDING');
      break;
    }
    case 6: {
	    console.log('STUDIO CAM');
      runRequest('finalize');
      break;
    }
    case 7: {
	    console.log('Main View / STUDIO');
      doExec('xdotool', ['key', '--delay', '100', 'alt+5']);
      break;
    }
    case 8: {
	    console.log('TRANSITION');
      runRequest('player2_hand', 'data=scissors');
      break;
    }
    case 9: {
	    console.log('NEXT SCENE');
      runRequest('player1_hand', 'data=scissors');
      break;
    }
    case 10: {
	    console.log('START/STOP RECORDING');
      doExec('xdotool', ['key', '--delay', '100', 'alt+8']);
      break;
    }
    case 11: {
	    console.log('STARTING OBS');
      break;
    }
    case 12: {
	    console.log('RED TEAM');
      doExec('xdotool', ['key', '--delay', '100', 'alt+9']);
      break;
    }
    case 13: {
	    console.log('CREDITS');
      runRequest('player2_hand', 'data=paper');
      break;
    }
    case 14: {
	    console.log('CHANGE SCENE');
      runRequest('player1_hand', 'data=paper');
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
  myStreamDeck.fillImageFromFile(7, path.resolve(__dirname, 'font-awesome_4-7-0_video-camera.png')).then(() => {
    console.log('Main video');
  });
  myStreamDeck.fillColor(2, 0, 0, 255);
  myStreamDeck.fillColor(12, 255, 0, 0);
  myStreamDeck.fillImageFromFile(3, path.resolve(__dirname, 'ionicons_2-0-1_film-marker_256_0_ffffff_none.png')).then(() => {
    console.log('Intro scene');
  });
  myStreamDeck.fillImageFromFile(6, path.resolve(__dirname, 'musician-rock-star-010-256.png')).then(() => {
    console.log('Studio scene');
  });
  myStreamDeck.fillImageFromFile(8, path.resolve(__dirname, 'transition-cover-256.png')).then(() => {
    console.log('Transition');
  });
  myStreamDeck.fillImageFromFile(13, path.resolve(__dirname, 'font-awesome_4-7-0_copyright_256_0_ffffff_none.png')).then(() => {
    console.log('Credits scene');
  });
}, 1000);

// Fill the first button form the left in the first row with a solid red color. This is synchronous.
// myStreamDeck.fillColor(4, 255, 0, 0);
//console.log('Successfully wrote a red square to key 4.');
