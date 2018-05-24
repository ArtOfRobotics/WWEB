/**
 * LedController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const rosnodejs = require('rosnodejs');
const msgs = rosnodejs.require('std_msgs').msg;
let pub = null;

module.exports = {
    advertise: async function (req, res) {
        // Create ROS publisher on the 'led' topic with ColorRGBA message
        if (!rosnodejs.nh._node) {
            await rosnodejs.initNode('/willyweb');
        }
        pub = rosnodejs.nh.advertise('/led', msgs.ColorRGBA);
        return res.json({ succes: true });
    },
    publish: function (req, res) {
        // Publish over ROS
        pub.publish({ data: req.param('rgb') });
        // Log through stdout and /rosout
        return res.json({ succes: true });
    }
};

