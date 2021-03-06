/**
 * UserController
 *
 * @description :: Server-side logic for managing cards
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var request = require('request');

module.exports = {
  // Disable default blueprints
  _config: { actions: false, rest: false, shortcuts: false },

  /**
   * UserController.update()
   */
  updateView: function(req, res) {
    res.view('user/settings');
  },
  update: function(req, res) {
    User.findOne({id: req.user.id}, async function foundUser (err, user) {
      if (err) return res.send(err, 500);

      user.location = req.body.location;

      await User.updateOne({ id: user.id }).set(user)

      res.redirect('/user/settings');
    });
  },
  cities: function(req, res) {

    request({
      url: 'https://maps.googleapis.com/maps/api/place/autocomplete/json',
      qs: {
        key: process.env.GOOGLE_MAPS_PUBLIC_API_SERVER_KEY,
        types: '(regions)',
        sensor: false,
        input: req.query.input
      }
    }, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        return res.send(body) // Show the HTML for the Google homepage. 
      }
    })
  }
}