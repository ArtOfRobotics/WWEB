# WWEB
Web platform

Install
1. clone repository
2. cd src
3. npm install
4. cd ..
5. source /opt/ros/kinetic/setup.bash
6. catkin_make

After this build you can launch any js file using
rosrun willyweb file.js

However you should add this to the beginning of a js file:
#!/usr/bin/env node
'use strict';

Window #1 (launch roscore)
1. source devel/setup.bash
2. roscore

Window #2 (generate sensor data)
1. source devel/setup.bash
2. rosrun willyweb receive.js

Window #3 (retreive sensor data)
1. source devel/setup.bash
2. rosrun willyweb send.js

