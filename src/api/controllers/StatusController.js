/**
 * StatusController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const { exec } = require('child_process');

module.exports = {
    arduinos: function (req, res) {
        sails.log(req.session.user.name + ' pinging arduino');
        const { exec } = require('child_process');
        var arduinosStatus = [];
        console.log(sails.config.defaults.arduinos);
        // sails.config.defaults.arduinos.forEach(arduino => {
        //     exec('rosnode ping ' + arduino.node + '- c 1', (err, stdout, stderr) => {
        //         if (stdout.indexOf("reply") > -1) {
        //             array.push({ 'name': arduino.name, 'online': true });
        //         } else {
        //             array.push({ 'name': arduino.name, 'online': false });
        //         }
        //     });

        // });

        return res.json(arduinosStatus);
    }
};