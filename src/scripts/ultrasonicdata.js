#!/usr/bin/env node
'use strict';

const rosnodejs = require('rosnodejs');
const msgs = rosnodejs.require('sensor_msgs').msg;

function talker() {
  // Register node with ROS master
  rosnodejs.initNode('/sonar')
    .then((rosNode) => {
      // Create ROS publisher on the 'chatter' topic with String message
      let pub = rosNode.advertise('/sonar', msgs.LaserEcho);
      let count = 0;
      const msg = new msgs.LaserEcho();
      // Define a function to execute every 100ms
      setInterval(() => {
        // Construct the message
        msg.echoes = [count, count, count, count, count, count, count, count, count, count];
        // Publish over ROS
        pub.publish(msg);
        // Log through stdout and /rosout
        rosnodejs.log.info(msg.echoes);
        ++count;
      }, 1000);
    });
}

if (require.main === module) {
  talker();
}