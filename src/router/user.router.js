const express = require("express");
const router = express.Router();
const { hashedPasword, comparePassword } = require("./../helper/hashpassword");
const {
  insertUser,
  getUserByEmail,
  getUserByuserId,
  deleteRefreshToken,
} = require("../model/user/user.model");
const { emailProcessor } = require("../helper/mail");
const {
  accessToken,
  refreshToken,
  createAccessToken,
  createRefreshToken,
} = require("../helper/JWTtoken");
const { deleteJWT } = require("../helper/redis");

const { userAuthorization } = require("../helper/authorization");
const { setPasswordResetPin } = require("../model/restPin/restPin.model");

router.all("/", (req, res, next) => {
  next();
});

//get user profile
router.get("/", userAuthorization, async (req, res) => {
  //get user id from requset which comes from userAuthorization middlware
  const _id = req.userId;

  const userProfile = await getUserByuserId(_id);

  res.json({ user: userProfile });
});

//create new user
router.post("/", async (req, res) => {
  const { name, compony, address, phonenumber, email, password } = req.body;
  const newPasword = await hashedPasword(password);
  try {
    const newObject = {
      name,
      compony,
      address,
      phonenumber,
      email,
      password: newPasword,
    };
    const result = await insertUser(newObject);

    res.json({ message: "New user added", result });
  } catch (err) {
    console.log(700, "hahaha");
    res.json({ status: "error", message: err.message });
  }
});

//login user router
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.json({ status: "error", message: "Invalid form submition" });
  const user = await getUserByEmail(email);
  if (!user)
    return res.json({ status: "error", message: "Invalid email or password." });
  const passFromDB = user && user.password;

  const result = await comparePassword(password, passFromDB);
  if (!result) {
    return res.json({ status: "error", message: "Invalid email or password." });
  }
  const accessToken = await createAccessToken(user.email, `${user._id}`);
  const refreshToken = await createRefreshToken(user.email, `${user._id}`);
  res.json({
    status: "success",
    message: "you logged in successfuly",
    accessToken,
    refreshToken,
  });
});

//reset password router
router.post("/reset-password", async (req, res) => {
  const { email } = req.body;

  const user = await getUserByEmail(email);

  if (user && user._id) {
    /// crate// 2. create unique 6 digit pin
    const setPin = await setPasswordResetPin(email);
    await emailProcessor({
      email,
      pin: setPin.pin,
      type: "request-new-password",
    });
  }

  res.json({
    status: "success",
    message:
      "If the email is exist in our database, the password reset pin will be sent shortly.",
  });
});

//user logout router
router.delete("/logout", userAuthorization, async (req, res) => {
  const { authorization } = req.headers;

  const userId = req.userId;

  deleteJWT(authorization);

  const user = await deleteRefreshToken(userId, "");

  if (user._id) {
    res.json({ status: "success", message: "logout successfuly.", user });
  }
  res.json({
    status: "error",
    message: "you cannot logged out,plz try again.",
  });
});
module.exports = router;
