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
    // This function is called as a preperation before publishing new data onto the LED topic
    advertise: async function (req, res) {

        if (!rosnodejs.nh._node) {
            await rosnodejs.initNode('/willyweb');
        }
        // Create ROS publisher on the 'led' topic with ColorRGBA message
        pub = rosnodejs.nh.advertise('/led', msgs.ColorRGBA);
        return res.json({ succes: true });
    },
    // This function is called when the color of the leds are updated, the new data is published onto the LED topic
    publish: function (req, res) {
        // Publish over ROS
        pub.publish({ r: req.param('rgb')[0], g: req.param('rgb')[1], b: req.param('rgb')[2], a: req.param('rgb')[3] });
        // Log through stdout and /rosout
        return res.json({ succes: true });
    }
};

