if (document.getElementById("configuration")) {
    var configuration = new Vue({
        el: '#configuration',
        data: {
            rgb: [255, 255, 255],
            brightness: 255,
            brightnessStyle: {
                width: 255 / 2.55 + '%'
            },
            drivingColors: false
        },
        watch: {
            brightness: function (val, oldVal) {
                this.brightnessStyle = {
                    width: val / 2.55 + '%'
                }
            },
            drivingColors: function (val, oldVal) {
                io.socket.get('/Led/drivingColors');
            }
        }
    })
    io.socket.get('/Led/advertise');
    $('#toggle-event').change(function () {
        configuration.drivingColors = $(this).prop('checked');
    })
}
function update(picker) {
    document.getElementById('rgb').innerHTML =
        Math.round(picker.rgb[0]) + ', ' +
        Math.round(picker.rgb[1]) + ', ' +
        Math.round(picker.rgb[2]);

    configuration.rgb = [picker.rgb[0], picker.rgb[1], picker.rgb[2], configuration.brightness];

    io.socket.get('/Led/publish', { rgb: configuration.rgb }, function (data) {
        console.log(data);
    });
}