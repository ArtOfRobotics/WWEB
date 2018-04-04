#!/usr/bin/env node
'use strict';

// Require rosnodejs itself
const rosnodejs = require('rosnodejs');
// Requires the std_msgs message package
const std_msgs = rosnodejs.require('std_msgs').msg;

function listener() {
  // Register node with ROS master
  rosnodejs.initNode('/sensor')
    .then((rosNode) => {
      // Create ROS subscriber on the 'chatter' topic expecting String messages
      let sub = rosNode.subscribe('/sensor', std_msgs.String,
        (data) => { // define callback execution
          rosnodejs.log.info('Afstand ontvangen: [' + data.data + ']');
        }
      );
    });
}

if (require.main === module) {
  // Invoke Main Listener Function
  listener();
}