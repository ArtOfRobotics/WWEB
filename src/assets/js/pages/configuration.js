if (document.getElementById("configuration")) {
    var configuration = new Vue({
        el: '#configuration',
        data: {
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
    io.socket.get('/Led/advertise');
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