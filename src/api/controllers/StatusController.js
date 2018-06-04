/**
 * StatusController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const { exec } = require('child_process');

module.exports = {
    arduinos: function (req, res) {
        sails.log(req.session.user.name + ' pinging arduinos');
        var arduinosStatus = [];
        sails.config.defaults.arduinos.forEach(arduino => {
            var status;
            exec('rosnode ping -c 1 ' + arduino.node, (err, stdout, stderr) => {
                if (stdout.indexOf("reply") > -1) {
                    arduinosStatus.push({ 'name': arduino.name, 'online': true });
                } else {
                    arduinosStatus.push({ 'name': arduino.name, 'online': false });
                }
                sails.sockets.blast('statusUpdated', arduinosStatus);
            });
        });
        return res.json(arduinosStatus);
    }
};