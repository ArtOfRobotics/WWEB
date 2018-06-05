if (window.location.pathname == '/control') {
    io.socket.get('/Motor/advertise');

    var vm = this;
    var lastZ = 0;
    var lastX = 0;

    var options = {
        color: '#444',
        size: 150,
        zone: document.getElementById('joystick-container')
    };
    var manager = nipplejs.create(options);

    manager.on('added', function (evt, nipple) {
        nipple.on('start move end dir plain', function (evt, data) {
            if (evt.type === 'move') {
                var z = 0, x = 0;
                // Willy is quite sensitive so turn down the distance by a fair margin, could make this a slider
                var distance = data.distance / 30;
                if (((data.angle.degree <= 90) && (data.angle.degree >= 0)) || ((data.angle.degree <= 360) && (data.angle.degree >= 270))) {
                    z = Math.cos(data.angle.radian) * distance;
                    x = Math.sin(data.angle.radian) * distance;
                }
                if (((data.angle.degree <= 180) && (data.angle.degree >= 90)) || ((data.angle.degree <= 270) && (data.angle.degree >= 180))) {
                    z = -Math.cos(Math.PI - data.angle.radian) * distance;
                    x = Math.sin(Math.PI - data.angle.radian) * distance;
                }
                // Invert the X and half the sensitivity
                z = (z * -1) / 2;

                // Only send new values if they are different enough
                if (Math.abs(lastZ - x) > 0.02 || Math.abs(lastX - x > 0.02)) {
                    io.socket.get('/Motor/publish', { x: x, z: z }, function (data) {
                        console.log(data);
                    });
                    //rcHub.invoke('Move', x, y);
                    lastZ = z;
                    lastX = x;
                }
            } else if (evt.type === 'end') {
                lastZ = 0;
                lastX = 0;
                $timeout(function () {
                    io.socket.get('/Motor/publish', { x: 0.0, z: 0.0 }, function (data) {
                        console.log(data);
                    });
                    //rcHub.invoke('Move', 0.0, 0.0)
                }, 250);
                $timeout(function () {
                    io.socket.get('/Motor/publish', { x: 0.0, z: 0.0 }, function (data) {
                        console.log(data);
                    });
                    //rcHub.invoke('Move', 0.0, 0.0) 
                }, 500)

            }
        });
    }).on('removed', function (evt, nipple) {
        nipple.off('start move end dir plain');
    });
}