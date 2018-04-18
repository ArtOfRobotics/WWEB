/**
 * SonarController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const rosnodejs = require('rosnodejs')
const msg = rosnodejs.require('sensor_msgs').msg;

module.exports = {
    subscribe: function (req, res) {
        sails.log("subscribing to sonar data");
        rosnodejs.initNode('/sonar_listener')
            .then((rosNode) => {
                let sub = rosNode.subscribe('/sonar', msg.LaserEcho,
                    (data) => {
                        console.log(data);
                    }
                );
            });
    },

    unsubscribe: function (req, res) {

    }
};

