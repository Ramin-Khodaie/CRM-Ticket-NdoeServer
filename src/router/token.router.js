const express = require("express");
const router = express.Router();

const { verifyRefreshToken, createAccessToken } = require("../helper/JWTtoken");
const { deleteJWT } = require("../helper/redis");
const { getUserByEmail } = require("../model/user/user.model");

//route to get access token when refresh token get expired.
router.get("/", async (req, res) => {
  const { authorization } = req.headers;

  const decode = await verifyRefreshToken(authorization);

  //check whether coming token is valid or not.
  if (decode.email) {
    //fetch user profile by email
    const userProfile = await getUserByEmail(decode.email);
    const dbRefreshToken = userProfile.refreshToken.token;

    if (userProfile._id) {
      //calculating expiration date od refresh token
      let tokenExpire = userProfile.refreshToken.createdDate;
      tokenExpire = tokenExpire.setDate(tokenExpire.getDate() + 30);

      const today = new Date();
      //if refresh token expire it will return Forbidden access to client
      if (dbRefreshToken !== authorization && tokenExpire < today) {
        res.status(403).json({ message: "Forbidden" });
      }
      //otherwise it will create another access token
      const accessJWT = await createAccessToken(
        decode.email,
        userProfile._id.toString()
      );
      deleteJWT(authorization);
      return res.json({ status: "success", accessJWT });
    }
  }
});

module.exports = router;
