if (document.getElementById("header")) {
    var url = window.location;
    var element = $('ul.navbar-nav a').filter(function () {
        return this.href == url || url.href.indexOf(this.href) == 0;
    }).parent().addClass('active');
    if (element.is('li')) {
        element.addClass('active').parent().parent('li').addClass('active')
    }

    var header = new Vue({
        el: '#header',
        data: {
            users: [],
            user: ''
        }
    })
    io.socket.get('/Login/currentuser', { currentpage: window.location.pathname }, function (user) {
        header.user = user;
    });

    UpdateUsers();
    io.socket.on('userUpdated', function () {
        UpdateUsers();
    });
}
function UpdateUsers() {
    io.socket.get('/User', function (users) {
        header.users = users;
    });
}
function ClearUsers() {
    header.users.forEach(user => {
        if (user.id != header.user.id) {
            io.socket.delete('/User/' + user.id);
        }
    });
    UpdateUsers();
}