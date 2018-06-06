/**
 * StatusController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const { exec } = require('child_process');
var componentStatus = [];

module.exports = {
    ping: function (req, res) {
        componentStatus = [];
        pingNetwork();
        pingArduinos();
        sails.log(req.session.user.name + ' pinging components');
        return res.json(componentStatus);
    }
};

function pingNetwork() {
    sails.config.defaults.network.forEach(component => {
        exec('ping  -c 1 ' + component.ip, (err, stdout, stderr) => {
            if (stdout.indexOf("from") > -1) {
                componentStatus.push({ 'name': component.name, 'online': true });
            } else {
                componentStatus.push({ 'name': component.name, 'online': false });
            }
            sails.sockets.blast('statusUpdated', componentStatus);
        });
    });
}

function pingArduinos() {
    sails.config.defaults.arduinos.forEach(arduino => {
        exec('rosnode ping -c 1 ' + arduino.node, (err, stdout, stderr) => {
            if (stdout.indexOf("reply") > -1) {
                componentStatus.push({ 'name': arduino.name, 'online': true });
            } else {
                componentStatus.push({ 'name': arduino.name, 'online': false });
            }
            sails.sockets.blast('statusUpdated', componentStatus);
        });
    });
}
