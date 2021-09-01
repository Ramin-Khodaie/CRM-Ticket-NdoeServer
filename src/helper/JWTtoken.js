const jwt = require("jsonwebtoken");
const { setJWT } = require("./redis");
const { addRefreshToken } = require("../model/user/user.model");

const createAccessToken = async (email, _id) => {
  const accessToken = jwt.sign({ email }, "kjljasdfakljljdsflkj", {
    expiresIn: "15m",
  });

  await setJWT(accessToken, _id);
  return Promise.resolve(accessToken);
};

const createRefreshToken = async (email, _id) => {
  try {
    const refreshToken = jwt.sign({ email }, "jkafsjkljfasfaskl", {
      expiresIn: "30d",
    });
    await addRefreshToken(_id, refreshToken);
    return Promise.resolve(refreshToken);
  } catch (error) {
    return new Promise.reject(error);
  }
};

const verifyToken = (jwtToken) => {
  try {
    return Promise.resolve(jwt.verify(jwtToken, "kjljasdfakljljdsflkj"));
  } catch (error) {
    return Promise.resolve(error);
  }
};
module.exports = {
  createAccessToken,
  createRefreshToken,
  verifyToken,
};
