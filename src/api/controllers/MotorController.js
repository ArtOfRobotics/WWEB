/**
 * MotorController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const rosnodejs = require('rosnodejs');
const msg = rosnodejs.require('geometry_msgs').msg;

module.exports = {
     // This function is called as a preperation before publishing new data onto the CMD_vel topic
     advertise: async function (req, res) {
        if (!rosnodejs.nh._node) {
            await rosnodejs.initNode('/willyweb');
        }
        // Create ROS publisher on the 'led' topic with ColorRGBA message
        pub = rosnodejs.nh.advertise('/led', msgs.Twist);
        return res.json({ succes: true });
    },
    // This function is called when the movement is updated, the new data is published onto the CMD_vel topic
    publish: function (req, res) {
        var vectorLinear = new msgs.Vector3();
        var vectorAngular = new msgs.Vector3();
        vectorLinear = [req.param('x'), 0, 0]; // [x, y, z]
        vectorAngular = [0, 0, req.param('z')]; // [x, y, z]

        // Publish over ROS
        pub.publish({ linear: vectorLinear, angular: vectorAngular });
        // Log through stdout and /rosout
        return res.json({ succes: true });
    }
};

