/**
 * LoginController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    // This function displays the default landingspage or login if the user is not authenticated
    view: function (req, res) {
        if (req.session.authenticated && req.session.user) {
            return res.redirect(sails.config.defaults.landingPage);
        } else {
            console.log('New visitor from: ' + req.ip + ' at: ' + req.originalUrl);
            return res.view('pages/login', { layout: 'layouts/login' });
        }
    },
    // This function is called upon authentication, when the user has entered a password
    authenticate: function (req, res) {
        if (req.param('password') == sails.config.defaults.password) {
            console.log('New visitor authenticated from: ' + req.ip);
            req.session.authenticated = true;
            res.json({ succes: true });
        } else {
            console.log('New visitor authentication failed: ' + req.ip);
            res.json({ succes: false });
        }
    },
    // This function is called upon identification, when the user has entered a username
    login: async function (req, res) {
        if (req.session.authenticated) {
            console.log('New visitor identified as: ' + req.param('name') + ' from: ' + req.ip);
            var user = await User.create({ name: req.param('name'), session: req.session.id, currentpage: req.originalUrl }).fetch();
            req.session.user = user;
            return res.json(user);
        }
    },
    // This function is called when a page is called, when the user navigates or is redirected to another page
    currentuser: async function (req, res) {
        var user = await User.update({ id: req.session.user.id }, { currentpage: req.param('currentpage') }).fetch();
        console.log(req.session.user.name + ' got page: ' + req.param('currentpage') + ' from: ' + req.ip);
        if (user[0]) {
            req.session.user = user[0];
            return res.json(req.session.user);
        }
    },
}