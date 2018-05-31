/**
 * SonarController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const rosnodejs = require('rosnodejs');
const msg = rosnodejs.require('sensor_msgs').msg;

module.exports = {
    // This function is called when ultrasonic data is requested
    subscribe: async function (req, res) {
        if (!rosnodejs.nh._node) {
            await rosnodejs.initNode('/willyweb');
        }
        sails.log(req.session.user.name + ' subscribing to sonar data');
        let sub = rosnodejs.nh.subscribe('/sonar', msg.LaserEcho,
            (data) => {
                sails.sockets.blast('sonarUpdated', data.echoes);
            }
        );
    },

    unsubscribe: function (req, res) {

    }
};S

