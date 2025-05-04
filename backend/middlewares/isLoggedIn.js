const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async function isLoggedIn(req, res, next) {
  const token = req.cookies?.token;
  res.locals.isLoggedIn = false;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select('-password');
      if (user) {
        req.user = user;
        res.locals.user = user;
        res.locals.isLoggedIn = true;
      }
    } catch (err) {
      // invalid token - do nothing
    }
  }

  next();
};
