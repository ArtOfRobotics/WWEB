#!/usr/bin/env node
'use strict';

const rosnodejs = require('rosnodejs');
const msgs = rosnodejs.require('std_msgs').msg;

async function talker() {
  await rosnodejs.initNode('/my_node');
  let pub = rosnodejs.nh.advertise('/led', msgs.ColorRGBA);
  let count = 0;
  var msg = new msgs.ColorRGBA();
  // Define a function to execute every 100ms
  setInterval(() => {
    msg = { r: 255, g: 255, b: 255, a: 255 };
    // Publish over ROS
    pub.publish(msg);
    // Log through stdout and /rosout
    rosnodejs.log.info(msg);
    ++count;
  }, 1000);
}

if (require.main === module) {
  talker();
}
