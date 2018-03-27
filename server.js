const rosnodejs = require('rosnodejs');
//rosnodejs.initNode('/my_node')
//.then(() => {
  // do stuff
//});

const nh = rosnodejs.nh;
const sub = nh.subscribe('/chatter', 'std_msgs/String', (msg) => {
  console.log('Got msg on chatter: %j', msg);
});

const pub = nh.advertise('/chatter', 'std_msgs/String');
pub.publish({ data: "hi" });