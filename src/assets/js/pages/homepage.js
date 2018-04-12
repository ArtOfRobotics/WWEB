var homepage = new Vue({
    el: '#homepage',
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

function UpdateUsers() {
    io.socket.get('/User', function (users) {
        homepage.users = users;
    });
}