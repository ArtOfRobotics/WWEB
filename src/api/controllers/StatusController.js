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
        const { exec } = require('child_process');
        var arduinosStatus = [];
        sails.config.defaults.arduinos.forEach(arduino => {
            var status;
            exec('rosnode ping ' + arduino.node + '- c 1', (err, stdout, stderr) => {
                if (stdout.indexOf("reply") > -1) {
                    status = { 'name': arduino.name, 'online': true };
                } else {
                    status = { 'name': arduino.name, 'online': false };
                }
            });
            arduinosStatus.push(status); // Inside the exec function the variable arduinoStatus is not available
        });
        console.log(arduinosStatus);
        return res.json(arduinosStatus);
    }
};