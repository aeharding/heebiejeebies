module.exports = function (req, res, next) {
  if (req.user && !req.user.location) {
    req.flash('success', 'Before starting to create cards, please enter your location and press save.');
    return res.redirect('/user/settings');
  }
  
  next();
}