/* authorization middleware that does a couple of checks
   to make sure we have a valid token or not and stores 
   extra data to help us fecth the user from the db*/


   const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    //checks to see if there is a valid authorization
    const authHeader = req.get('Authorization');
     if (!authHeader) {
       req.isAuth = false;
       return next();
     }
    // make sure there is a valid token
    const token = authHeader.split(' ')[1];
     if (!token || token === '') {
       req.isAuth = false;
       return next();
     }
     let decodedToken;
    //verifies valid token
    try {
        decodedToken = jwt.verify(token, 'somesupersecretkey');
      } catch (err) {
        req.isAuth = false;
        return next();
      }
      if (!decodedToken) {
        req.isAuth = false;
        return next();
      }
      req.isAuth = true;
      req.userId = decodedToken.userId;
      next();
    };