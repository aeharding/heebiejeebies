/**
 * StaticViewsController
 *
 * @description :: Server-side logic for managing Staticviews
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	


  /**
   * `StaticViewsController.eula()`
   */
  eula: function (req, res) {
    return res.view('eula');
  },
  /**
   * `StaticViewsController.privacyPolicy()`
   */
  privacyPolicy: function (req, res) {
    return res.view('privacy-policy');
  }
};

