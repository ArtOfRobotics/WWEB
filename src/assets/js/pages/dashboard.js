if (document.getElementById("dashboard")) {
    var dashboard = new Vue({
        el: '#dashboard',
        data: {
            users: [],
            sonar: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
            online: [true, false, true]
        }
    })

    io.socket.get('/Sonar/subscribe');
    io.socket.on('sonarUpdated', function (data) {
        dashboard.sonar = data;
    });
    io.socket.get('/Status/arduino', function (data) {
        dashboard.online = data;
    });
}