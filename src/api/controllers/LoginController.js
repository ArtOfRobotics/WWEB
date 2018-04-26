/**
 * LoginController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    view: function (req, res) {
        if (req.session.authenticated && req.session.user) {
            return res.redirect('/dashboard');
        } else {
            console.log('New visitor from: ' + req.ip + ' at: ' + req.originalUrl);
            return res.view('pages/login', { layout: 'layouts/login' });
        }
    },
    authenticate: function (req, res) {
        if (req.param('password') == 'Willy1234') { // Hard
            console.log('User authenticated from: ' + req.ip);
            req.session.authenticated = true;
            res.json({ succes: true });
        } else {
            console.log('User authentication failed: ' + req.ip);
            res.json({ succes: false });
        }
    },
    login: async function (req, res) {
        if (req.session.authenticated) {
            console.log('User identified as: ' + req.param('name') + ' from: ' + req.ip);
            var user = await User.create({ name: req.param('name'), session: req.session.id, currentpage: req.originalUrl }).fetch();
            req.session.user = user;
            return res.json(user);
        }
    },
    currentuser: async function (req, res) {
        var user = await User.update({ id: req.session.user.id }, { currentpage: req.param('currentpage') }).fetch();
        console.log(req.session.user.name + ' got page: ' + req.param('currentpage') + ' from: ' + req.ip);
        if (user[0]) {
            req.session.user = user[0];
            return res.json(req.session.user);
        }
    },
}