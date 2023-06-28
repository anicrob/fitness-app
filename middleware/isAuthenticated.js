const isAuthenticated = (req, res, next) => {
  if (req.session.logged_in) {
    return next();
  }
  return res.redirect('/login');
};

module.exports = isAuthenticated;
