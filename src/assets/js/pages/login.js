if (window.location.pathname == '/' || window.location.pathname == '/login') {
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
                io.socket.get('/Login/login', { username: this.username });
                window.location.href = 'http://localhost:1337/dashboard';
            }
        }
    })
    document.getElementById("password").focus();
}

function flip() {
    document.querySelector(".card-flip").classList.toggle("go-flip");
}