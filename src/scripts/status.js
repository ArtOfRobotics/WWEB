#!/usr/bin/env node
'use strict';

const { exec } = require('child_process');
var async = require("async");
var test;
async function listener() {
    var arduinos = [
        { 'name': 'LED Arduino', 'node': 'rosout' },
        { 'name': 'Motor Arduino', 'node': 'arduino1' },
        { 'name': 'GPS & Compass Arduino', 'node': 'arduino2' },
        { 'name': 'Sonar Arduino', 'node': 'arduino3' }];
    var arduinosStatus = [];
    arduinos.forEach((arduinos, (arduino) => {
        exec('rosnode ping -c 1 ' + arduino.node).stdout.on('data', (data) => {
            if (data.indexOf("reply") > -1) {
                arduinosStatus.push({ 'name': arduino.name, 'online': true });
            } else {
                arduinosStatus.push({ 'name': arduino.name, 'online': false });
            }
        });
    }));
    console.log(arduinosStatus);
}
function checkReply(arduino) {
    var ls = exec('rosnode ping -c 1 ' + arduino.node);
    ls.stdout.on('data', (data) => {
        if (data.indexOf("reply") > -1) {
            return { 'name': arduino.name, 'online': true };
        } else {
            return { 'name': arduino.name, 'online': false };
        }
    });
}

if (require.main === module) {
    listener();
}
