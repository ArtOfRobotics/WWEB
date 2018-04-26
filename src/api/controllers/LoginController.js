/**
 * LoginController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    authenticate: function (req, res) {
        if (req.param('password') == 'Willy1234') { // Hard
            req.session.authenticated = true;
            res.json({ succes: true });
        } else {
            res.json({ succes: false });
        }
    },
    login: function (req, res) {
        if (req.session.authenticated) {
            console.log('\n\nCreating a new user...');

            User
                .create(_.omit(req.allParams(), 'id'), function (err, user) {
                    if (err) return res.badrequest(err)
                    res.status(201);
                    console.log(user);
                    return res.json(user);
                });
        }
    }
};