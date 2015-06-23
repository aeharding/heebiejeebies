module.exports = function (req, res, next) {
  res.locals.host = req.get('host');

  next();
};
