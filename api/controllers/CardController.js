/**
 * CardController
 *
 * @description :: Server-side logic for managing cards
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var randomstring = require("randomstring");

module.exports = {
  // Disable default blueprints
  _config: { actions: false, rest: false, shortcuts: false },

  /**
   * CardController.create()
   */
  create: function(req, res) {
    var params = _.extend(req.query || {}, req.params || {}, req.body || {});

    params.author = req.user.id;
    params.permalink = randomstring.generate(7);
    UidService(function(uid) {
      params.uid = uid;

      Card.create(params, function cardCreated (err, createdCard) {

        if (err) return res.send(err, 500);
        res.format({
          json: function() {
            return res.json(createdCard);
          },
          html: function() {
            return res.redirect('/c/'+ createdCard.uid);
          }
        });
      });
    });
  },

  createPrompt: function(req, res) {
    return res.view('card/create');
  },
  
  /**
   * CardController.all()
   */
  all: function (req, res) {
    Card.find({ author: req.user.id }, function foundCards (err, cards) {
      if (err) return res.send(err, 500);
      res.json(cards);
    })
  },

  /**
   * CardController.one()
   */
  one: function (req, res) {
    Card.findOne({ uid: req.params.uid }, function foundCard (err, card) {
      if (err) return res.send(err, 500);
      if (!card) return res.send(404);

      User.findOne({id: card.author}, function foundUser (err, user) {
        if (err) return res.send(err, 500);

        res.format({
          json: function() {
            return res.json(card);
          },
          html: function() {
            return res.view('card/one', {
              card: card,
              author: user
            });
          }
        });
      });
    });
  }

};