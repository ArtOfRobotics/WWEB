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
    },
    driving: function (req, res){
        if (!rosnodejs.nh._node) {
            await rosnodejs.initNode('/willyweb');
        }
        let sub = rosnodejs.nh.subscribe('/cmd_vel', msg.Twist,
            (data) => {
                switch (true) {
                    case data.linear.x > 0:
                    // Blue flickering (driving forward)
                    setInterval(() => {
                        pub.publish({ r: 0, g: 0, b: 255, a: 255 });
                        setInterval(() => {
                            pub.publish({ r: 255, g: 255, b: 255, a: 255 });
                          }, 1000);  
                    }, 2000);                    
                        break;
                        case data.linear.x < 0:
                        // Red flickering (driving reverse)
                        setInterval(() => {
                            pub.publish({ r: 255, g: 0, b: 0, a: 255 });
                            setInterval(() => {
                                pub.publish({ r: 255, g: 255, b: 255, a: 255 });
                              }, 1000);  
                        }, 2000);
                        
                        break;
                    default:
                    // Solid green (no driving)
                    pub.publish({ r: 0, g: 255, b: 0, a: 255 });
                        break;
                }
                sails.sockets.blast('ledUpdated');
            }
        );
    }
};

