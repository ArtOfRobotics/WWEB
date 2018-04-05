cmake_minimum_required(VERSION 2.8.3)
project(demo)

find_package(catkin REQUIRED)

###################################
## catkin specific configuration ##
###################################
catkin_package()

#############
## Install ##
#############

install(PROGRAMS
   send.js
   receive.js
   DESTINATION ${CATKIN_PACKAGE_BIN_DESTINATION}
)