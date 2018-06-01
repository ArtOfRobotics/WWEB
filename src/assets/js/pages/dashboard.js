if (document.getElementById("dashboard")) {
    var dashboard = new Vue({
        el: '#dashboard',
        data: {
            users: [],
            sonar: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
            online: [true, false, true],
            rgb: [255, 255, 255, 255],
            brightness: 255,
            brightnessStyle: {
                width: 255 / 2.55 + '%'
              }
        },
        watch: {
            brightness: function (val, oldVal) {
              this.brightnessStyle ={
            width: val / 2.55 + '%'
          }
            },
          }
    })

    io.socket.get('/Sonar/subscribe');
    io.socket.get('/Led/advertise');
    io.socket.on('sonarUpdated', function (data) {
        dashboard.sonar = data;
    });
    io.socket.get('/Status/arduinos', function (data) {
        dashboard.online = data;
    });
}

function update(picker) {
    document.getElementById('rgb').innerHTML =
        Math.round(picker.rgb[0]) + ', ' +
        Math.round(picker.rgb[1]) + ', ' +
        Math.round(picker.rgb[2]);

    dashboard.rgb = [picker.rgb[0], picker.rgb[1], picker.rgb[2], dashboard.brightness];


    io.socket.get('/Led/publish', { rgb: dashboard.rgb }, function (data) {
        console.log(data);
    });
}