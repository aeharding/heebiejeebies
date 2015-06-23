// Provide a random UID that is guaranteed to be unique

var randomstring = require("randomstring");

module.exports = function generateUID(cb) {

  return getUid(cb);

  function getUid(cb) {

    var uid = randomstring.generate(7);

    Uid.create({ uid: uid }, function gotUid(err) {
      if (!err) {
        return cb(uid);
      } else {
        return getUid(cb);
      }
    });
  }



}