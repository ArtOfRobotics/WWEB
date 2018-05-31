if (document.getElementById("login")) {
    var login = new Vue({
        el: '#login',
        data: {
            password: '',
            username: ''
        },
        methods: {
            authenticate: function (event) {
                io.socket.put('/Login/authenticate', { password: this.password }, function (response) {
                    if (response.succes) {
                        flip();
                        document.getElementById("username").focus();
                        // tried, but didn't work: this.$refs.username.focus();
                    } else {
                        alert('failed to authenticate');
                    }
                });

            },
            login: function (event) {
                io.socket.get('/Login/login', { name: this.username }, function (user) {
                    if (user) {
                        if (window.location.path != '/') {
                            window.location.reload();
                        } else {
                            window.location = '/dashboard'
                        }
                    }
                });
            }
        }
    })
    document.getElementById("password").focus();
}

function flip() {
    document.querySelector(".card-flip").classList.toggle("go-flip");
}