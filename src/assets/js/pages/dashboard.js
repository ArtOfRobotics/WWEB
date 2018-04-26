if (window.location.pathname == '/dashboard') {
    var dashboard = new Vue({
        el: '#dashboard',
        data: {
            users: []
        }
    })

    UpdateUsers();

    io.socket.on('userUpdated', function () {
        UpdateUsers();
    })
}

function UpdateUsers() {
    io.socket.get('/User', function (users) {
        dashboard.users = users;
    });
}