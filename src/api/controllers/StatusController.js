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
        exec('rosnode ping sonar -c 1', (err, stdout, stderr) => {
            if (stdout.indexOf("reply") > -1) {
                return res.json([{ 'name': 'Sonar Arduino', 'online': true }, { 'name': 'Motor Arduino', 'online': true }, { 'name': 'GPS & Compass Arduino', 'online': true }])
            } else { // TODO Hardcoded
                return res.json([{ 'name': 'Sonar Arduino', 'online': false }, { 'name': 'Motor Arduino', 'online': false }, { 'name': 'GPS & Compass Arduino', 'online': false }]);
            }
        });
    }
};