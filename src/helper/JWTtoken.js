const jwt = require("jsonwebtoken");
const { setJWT } = require("./redis");
const { addRefreshToken } = require("../model/user/user.model");

const createAccessToken = async (email, _id) => {
  const accessToken = jwt.sign({ email }, "kjljasdfakljljdsflkj", {
    expiresIn: "2h",
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

//decode access token using token and access secret key
const verifyAccessToken = (jwtToken) => {
  try {
    return Promise.resolve(jwt.verify(jwtToken, "kjljasdfakljljdsflkj"));
  } catch (error) {
    return Promise.resolve(error);
  }
};

//decode refresh token using token and refresh secret key
const verifyRefreshToken = (jwtToken) => {
  try {
    return Promise.resolve(jwt.verify(jwtToken, "jkafsjkljfasfaskl"));
  } catch (error) {
    return Promise.resolve(error);
  }
};
module.exports = {
  createAccessToken,
  createRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
