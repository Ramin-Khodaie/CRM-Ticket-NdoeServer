const express = require("express");
const router = express.Router();

const { verifyRefreshToken, createAccessToken } = require("../helper/JWTtoken");
const { getUserByEmail } = require("../model/user/user.model");

router.get("/", async (req, res) => {
  const { authorization } = req.headers;

  const decode = await verifyRefreshToken(authorization);

  if (decode.email) {
    const userProfile = await getUserByEmail(decode.email);
    const dbRefreshToken = userProfile.refreshToken.token;
    if (userProfile._id) {
      let tokenExpire = userProfile.refreshToken.createdDate;
      tokenExpire = tokenExpire.setDate(tokenExpire.getDate() + 30);

      const today = new Date();

      if (dbRefreshToken !== authorization && tokenExpire < today) {
        res.status(403).json({ message: "Forbidden" });
      }
      const accessJWT = await createAccessToken(
        decode.email,
        userProfile._id.toString()
      );

      res.json({ status: "success", accessJWT });
    }
  }
});

module.exports = router;
