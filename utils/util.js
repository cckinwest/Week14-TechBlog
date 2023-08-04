const minute = 300000;

const withAuth = (req, res, next) => {
  // If the user is not logged in, redirect the request to the login route
  if (!req.session.loggedIn) {
    res.redirect("/login");
  } else {
    req.session.cookie.maxAge = minute;
    req.session.cookie.expires = new Date(new Date().getTime() + minute);
    next();
  }
};

module.exports = withAuth;
