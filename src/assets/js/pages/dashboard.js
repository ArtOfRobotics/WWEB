if (window.location.pathname == '/' || window.location.pathname == '/dashboard') {
    var dashboard = new Vue({
        el: '#dashboard',
        data: {
            username: '',
            users: []
        },
        methods: {
            login: function () {
                io.socket.post('/User', { name: this.username }, function (response) {
                    console.log(response);
                });
            }
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