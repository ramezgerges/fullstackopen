const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/user");
require("express-async-errors");

router.post("/", async (req, res) => {
  const { body } = req;

  if (body.password?.length === undefined)
    return res.status(400).json({ error: "bad password" });
  if (body.password.length < 4)
    return res.status(400).json({ error: "password shorter than 3" });

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const newUser = new User({
    username: body.username,
    passwordHash,
    name: body.name
  });

  const savedUser = await newUser.save();

  return res.status(201).json(savedUser);
});

router.get("/", async (req, res) => {
  const users = await User.find({}).populate("blogs", { user: 0 });

  res.json(users);
});

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id).populate("blogs", {
    user: 0
  });
  if (user) res.json(user);
  else res.status(404).end();
});

module.exports = router;
