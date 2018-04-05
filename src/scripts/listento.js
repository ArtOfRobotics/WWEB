#!/usr/bin/env node
'use strict';

// How to use;
// rosrun willyweb scripts/listento.js NODE
// exapmle: rosrun willyweb scripts/listento.js sonar

const rosnodejs = require('rosnodejs');
const std_msgs = rosnodejs.require('std_msgs').msg;

function listener(node) {  
  rosnodejs.initNode('/' + node + '_listener')
    .then((rosNode) => {
      rosnodejs.log.info('Start listening to /' + node + ' on node: ' + '/' + node + '_listener' );
        let sub = rosNode.subscribe('/' + node, std_msgs.String,
        (data) => { // define callback execution
          rosnodejs.log.info('Received data: [' + data.data + ']');
        }
      );
    });
}

if (require.main === module) {
  listener(process.argv[2]);
}