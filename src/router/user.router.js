const express = require("express");
const router = express.Router();
const { insertUser } = require("../model/user/user.model");

router.all("/", (req, res, next) => {
  // console.log(name);
  // res.json({ message: "return from user router" });
  next();
});

router.post("/", async (req, res) => {
  try {
    const result = await insertUser(req.body);

    res.json({ message: "New user added", result });
  } catch (err) {
    res.json({ status: "error", message: err.message });
  }
});

module.exports = router;
