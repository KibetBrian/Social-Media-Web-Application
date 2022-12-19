
function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).send('Unauthorized');
      return;
    }
  
    const [scheme, token] = authHeader.split(' ');
    if (scheme !== 'Bearer') {
      res.status(401).send('Unauthorized');
      return;
    }
  
    try {
      const { userId } = jwt.verify(token, secret);
      req.userId = userId;
      next();
    } catch (error) {
      res.status(401).send('Unauthorized');
    }
  }

  module.exports=authenticate;
  