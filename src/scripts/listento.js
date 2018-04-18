#!/usr/bin/env node
'use strict';

// How to use;
// rosrun willyweb scripts/listento.js NODE
// exapmle: rosrun willyweb scripts/listento.js sonar

const rosnodejs = require('rosnodejs');

function listener(node) {
  var type = 'sensor_msgs';
  const msg = rosnodejs.require(type).msg;
  rosnodejs.initNode('/' + node + '_listener')
    .then((rosNode) => {
      rosnodejs.log.info('Start listening to /' + node + ' on node: ' + '/' + node + '_listener');
      switch (node) {
        case "sonar":
          subscribeTo(rosNode, node, msg.LaserScan);
          break;

        default:

          break;

      }
    });
}

function subscribeTo(rosNode, node, type) {
  let sub = rosNode.subscribe('/' + node, type,
    (data) => {
      console.log(data);
    }
  );
}

if (require.main === module) {
  listener(process.argv[2]);
}