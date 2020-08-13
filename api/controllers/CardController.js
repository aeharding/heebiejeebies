/**
 * CardController
 *
 * @description :: Server-side logic for managing cards
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var randomstring = require("randomstring");
var nl2br = require("nl2br");
var escape = require("escape-html");

var json2csv = require('json2csv');


function escapeWithBreaks(str) {
  return nl2br(escape(str), false);
}

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
            return res.redirect('/cards/'+ createdCard.uid);
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
    Card.find({ author: req.user.id })
      .sort('createdAt DESC')
      .exec(
        function foundCards (err, cards) {
          if (err) return res.send(err, 500);

          var groupedCardsForPrinting = [];
          for (var i = 0; i < cards.length; i+=6) {
            var group = [];
            for (var j = i; j < i + 6 && j < cards.length; j++) {
              group.push(cards[j]);
            }
            groupedCardsForPrinting.push(group);
          }

          res.format({
            json: function() {
              return res.json(cards);
            },
            html: function() {
              return res.view('card/many', {
                groupedCardsForPrinting: groupedCardsForPrinting,
                cards: cards,
                user: req.user,
                escapeWithBreaks: escapeWithBreaks
              });
            }
          });
        }
      );
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
              author: user,
              user: req.user,
              escapeWithBreaks: escapeWithBreaks
            });
          }
        });
      });
    });
  },

  /**
   * CardController.delete()
   */
   delete: function (req, res) {
    Card.findOne({ uid: req.params.uid }, function foundCard (err, card) {
      if (err) return res.send(err, 500);
      if (!card) return res.send(404);

      // Determine if author
      if (req.user.id !== card.author) {
        return res.forbidden('You are not permitted to perform this action.');
      }

      Card.destroyOne({ uid: card.uid }).exec(function() {
        res.format({
          json: function() {
            return res.send(204);
          },
          html: function() {
            return res.redirect('/cards');
          }
        });
      });
    });
   },

  /**
   * CardController.exportAllToCsv()
   */

  exportAllToCsv: function (req, res) {
    Card.find().populate('author').exec(function foundAllCards (err, cards) {
      if (err) return res.send(500);

      for (var i = 0; i < cards.length; i++) {
        cards[i].displayName = cards[i].author.displayName;
        cards[i].location = cards[i].author.location;
        cards[i].username = cards[i].author.username;
      }

      json2csv({ data: cards, fields: [
        'displayName',
        'location',
        'username',
        'top',
        'smiley',
        'bottom',
        'attribution',
        'uid',
        'createdAt'
      ] }, function(err, csv) {
        if (err) return res.send(500);

        res.set('Content-Type', 'application/octet-stream');
        res.send(csv);
      });
    });


  }

};

