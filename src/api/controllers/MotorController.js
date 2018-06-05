/**
 * MotorController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const rosnodejs = require('rosnodejs');
const msgs = rosnodejs.require('geometry_msgs').msg;

module.exports = {
    // This function is called as a preperation before publishing new data onto the CMD_vel topic
    advertise: async function (req, res) {
        if (!rosnodejs.nh._node) {
            await rosnodejs.initNode('/willyweb');
        }
        // Create ROS publisher on the 'led' topic with ColorRGBA message
        pub = rosnodejs.nh.advertise('/cmd_vel', msgs.Twist);
        return res.json({ succes: true });
    },
    // This function is called when the movement is updated, the new data is published onto the CMD_vel topic
    publish: function (req, res) {
        var msg = new msgs.Twist();
        var vectorLinear = new msgs.Vector3();
        var vectorAngular = new msgs.Vector3();
        vectorLinear = { x: req.param('x'), y: 0, z: 0 }; // [x, y, z]
        vectorAngular = { x: 0, y: 0, z: req.param('z') }; // [x, y, z]
        msg = { linear: vectorLinear, angular: vectorAngular };
        // Publish over ROS
        pub.publish(msg);

        // Log through stdout and /rosout
        return res.json({ succes: true });
    }
};

