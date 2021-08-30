const express = require("express");
const router = express.Router();
const { hashedPasword, comparePassword } = require("./../helper/hashpassword");
const { insertUser, getUserByEmail } = require("../model/user/user.model");

router.all("/", (req, res, next) => {
  // console.log(name);
  // res.json({ message: "return from user router" });
  next();
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

//login user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.json({ status: "error", message: "Invalid form submition" });
  const user = await getUserByEmail(email);
  if (!user)
    return res.json({ status: "error", message: "Invalid email or password." });
  const passFromDB = user && user.password;

  const result = await comparePassword(password, passFromDB);
  if (result) {
    res.json({ status: "success", message: "successfuly logged in.", user });
  } else {
    res.json({ status: "error", message: "Invalid email or password" });
  }
});
module.exports = router;
