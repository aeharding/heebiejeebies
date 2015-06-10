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
    res.view('user/settings', {
      success : req.flash('success')
    });
  },
  update: function(req, res) {
    User.findOne({id: req.user.id}, function foundUser (err, user) {
      if (err) return res.send(err, 500);

      user.location = req.body.location;

      user.save(function() {
        req.flash('success', 'Saved settings!');
        res.redirect('/user/settings');
      });

    });
  },
  cities: function(req, res) {

    request({
      url: 'https://maps.googleapis.com/maps/api/place/autocomplete/json',
      qs: {
        key: 'AIzaSyDFl3f_ezPd7G9I_9r-B2K0jMU4gs-GHvI',
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