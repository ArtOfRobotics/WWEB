/**
 * VisualisationController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    // This function displays the visualisation page
    view: function (req, res) {
        return res.view('pages/visualisation');
    },

};

