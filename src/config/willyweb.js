module.exports.defaults = {
  password: 'Willy1234',
  landingPage: '/dashboard',

  //Arduinos
  arduinos: [
    { 'name': 'LED Arduino', 'node': 'arduino0' },
    { 'name': 'Motor Arduino', 'node': 'arduino1' },
    { 'name': 'GPS & Compass Arduino', 'node': 'arduino3' },
    { 'name': 'Sonar Arduino', 'node': 'arduino2' }],

  network: [
    { 'name': 'Sick Lidar', 'ip': '192.168.0.180' },
    { 'name': 'Router', 'ip': '192.168.0.1' }],

  //Dummydata
  dummy: {
    sonar: { echoes: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16] },
    led: { data: [255, 255, 255, 255] }
  }
};