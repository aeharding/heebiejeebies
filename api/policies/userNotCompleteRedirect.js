module.exports = function (req, res, next) {
  if (req.user && !req.user.location) {
    return res.redirect('/user/settings');
  }
  
  next();
}