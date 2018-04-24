if (window.location.pathname == '/sonar') {
    var sonar = new Vue({
        el: '#sonar',
        data: {
            values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        }
    })

    io.socket.get('/Sonar/subscribe');
    io.socket.on('sonarUpdated', function (data) {
        sonar.values = data;
    });
}