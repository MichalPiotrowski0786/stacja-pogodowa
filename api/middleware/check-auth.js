const jwt = require('jsonwebtoken'); //stała przechowująca 'jsonwebtoken'

module.exports = (req, res, next) => {
  try {
    const decoded = jwt.verify(
      req.headers.authorization.split(' ')[1],
      process.env.hasloJWT
    ); //w tym kroku jwt weryfikuje nasz token
    next();
  } catch (err) {
    res.status(401).json({wiadomość: err});
  } //w przypadku złego tokenu lub innego błędu autoryzacji wyskoczy nam błąd
};
