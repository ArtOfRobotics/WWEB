/**
 * ControlController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    // This function displays the control page
    view: function (req, res) {
        return res.view('pages/control');
    },
};

