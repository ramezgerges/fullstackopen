const router = require("express").Router();
require("express-async-errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const config = require("../utils/config");

router.post("/", async (req, res) => {
  const { body } = req;

  const user = await User.findOne({ username: body.username });
  const passwordCorrect =
    user === null
      ? false
      : await bcrypt.compare(body.password, user.passwordHash);

  if (!(passwordCorrect && user))
    return res.status(401).json({ error: "invalid username or password" });

  const token = jwt.sign(
    {
      username: user.username,
      id: user._id
    },
    config.SECRET
  );

  return res.status(200).send({
    token,
    username: user.username,
    name: user.name
  });
});

module.exports = router;
