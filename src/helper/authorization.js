const { verifyToken } = require("./JWTtoken");
const { getJWT } = require("./redis");

//middlware to authorize a user with specific token,if token is valid it will return corresponding userid.
const userAuthorization = async (req, res, next) => {
  const { authorization } = req.headers;

  const decode = await verifyToken(authorization);
  if (decode.email) {
    const userId = await getJWT(authorization);

    if (!userId) {
      return res.status(403).json({ message: "Forbbiden" });
    }
    //if there is user then append its id to request.
    req.userId = userId;
    return next();
  }
};

module.exports = {
  userAuthorization,
};