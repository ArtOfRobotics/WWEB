#!/usr/bin/env node
'use strict';

const rosnodejs = require('rosnodejs');
const msgs = rosnodejs.require('sensor_msgs').msg;

function talker() {
  // Register node with ROS master
  rosnodejs.initNode('/sonar')
    .then((rosNode) => {
      // Create ROS publisher on the 'chatter' topic with String message
      let pub = rosNode.advertise('/sonar', msgs.LaserScan);
      let count = 0;
      const msg = new msgs.LaserScan();
      // Define a function to execute every 100ms
      setInterval(() => {
        // Construct the message
        msg.data = 'sensordata ' + count;
        // Publish over ROS
        pub.publish(msg);
        // Log through stdout and /rosout
        rosnodejs.log.info('Afstand: [' + msg.data + ']');
        ++count;
      }, 100);
    });
}

if (require.main === module) {
  talker();
}