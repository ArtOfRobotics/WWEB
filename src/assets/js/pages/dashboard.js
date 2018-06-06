if (document.getElementById("dashboard")) {
    var dashboard = new Vue({
        el: '#dashboard',
        data: {
            users: [],
            sonar: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
            status: [],
            components: [],
            status: [{ name: 'Loading...' }],
            rgb: [255, 255, 255],
            brightness: 255,
            brightnessStyle: {
                width: 255 / 2.55 + '%'
            }
        },
        watch: {
            brightness: function (val, oldVal) {
                this.brightnessStyle = {
                    width: val / 2.55 + '%'
                }
            },
        }
    })

    io.socket.get('/Sonar/subscribe');
    io.socket.on('statusUpdated', function (data) {
        dashboard.status = data;
    });
    io.socket.on('componentsUpdated', function (data) {
        dashboard.components = data;
    });
    io.socket.on('sonarUpdated', function (data) {
        dashboard.sonar = data;
    });
    io.socket.get('/Status/ping');
    //setInterval(() => {
    //    io.socket.get('/Status/ping');
    //  }, 10000);
}

function updateStatus() {
    io.socket.get('/Status/ping');
}
