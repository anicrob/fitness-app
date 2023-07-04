const checkSessionExpiration = (req, res, next) => {
  if (req.session.cookie.expires < new Date() && req.originalUrl !== '/login') {
    // Session has expired, log the user out
    req.session.destroy(() => {
      res.redirect('/login'); // Redirect to the login page
    });
  } else {
    next();
  }
};
module.exports = checkSessionExpiration;
