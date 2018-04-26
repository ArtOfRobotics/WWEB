var onlineUsers = new Vue({
    el: '#users',
    data: {
        users: [],
        usersonline: 0
    }
})

UpdateUsers();

io.socket.on('userUpdated', function () {
    UpdateUsers();
})

function UpdateUsers() {
    io.socket.get('/User', function (users) {
        onlineUsers.users = users;
        onlineUsers.usersonline = users.length;
    });
}