/**
 * LoginController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    authenticate: function (req, res) {
        if (req.param('password') == 'Willy1234') {
            req.session.authenticated = true;
            res.json({ succes: true });
        } else {
            res.json({ succes: false });
        }
    },
    login: function (req, res) {
        var user = User.create({
            name: req.param('username')
        });
        req.session.user = user;
    }
};