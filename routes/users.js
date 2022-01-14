const express = require("express");
const router = express.Router();
const User = require("../database/models/user");
const errorHandler = require("../utils/errorHandler");

router.get("/", async function (req, res) {
  try {
    const users = await User.findAll({ attributes: { exclude: ["password"] } });
    res.send(users);
  } catch (error) {
    errorHandler(res, error);
  }
});

router.post("/", async function (req, res) {
  try {
    const user = await User.create({
      userName: req.body.userName,
      password: req.body.password,
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber,
    });
    delete user.dataValues.password;
    res.status(201).send(user);
  } catch (error) {
    errorHandler(res, error);
  }
});

router.put("/:id", async function (req, res) {
  try {
    // const targetUser = await User.findOne({ where: { id: req.params.id } });
    const targetUser = await User.findByPk(req.params.id);
    if (!targetUser) {
      return res.status(404).send({ message: "user not found." });
    }
    await targetUser.update(req.body);
    delete targetUser.dataValues.password;
    res.send(targetUser);
  } catch (error) {
    errorHandler(res, error);
  }
});

router.delete("/:id", async function (req, res) {
  try {
    // const targetUser = await User.findOne({ where: { id: req.params.id } });
    const targetUser = await User.findByPk(req.params.id);
    if (!targetUser) {
      return res.status(404).send({ message: "user not found." });
    }
    await targetUser.destroy();
    res.send();
  } catch (error) {
    errorHandler(res, error);
  }
});

module.exports = router;
