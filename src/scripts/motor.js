#!/usr/bin/env node
'use strict';

const rosnodejs = require('rosnodejs');
const msgs = rosnodejs.require('geometry_msgs').msg;

async function talker() {
  await rosnodejs.initNode('/my_node');
  let pub = rosnodejs.nh.advertise('/cmd_vel', msgs.Twist);
  let count = 0;
  var msg = new msgs.Twist();

  var vectorLinear = new msgs.Vector3();
  var vectorAngular = new msgs.Vector3();

  // Define a function to execute every 100ms
  setInterval(() => {
    vectorLinear = { x: count, y: 0, z: 0 }; // [x, y, z]
    vectorAngular = { x: 0, y: 0, z: count }; // [x, y, z]
    msg = { linear: vectorLinear, angular: vectorAngular }
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
