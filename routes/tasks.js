const express = require("express");
const router = express.Router();
const User = require("../database/models/user");
const Task = require("../database/models/task");
const errorHandler = require("../utils/errorHandler");

router.get("/:id", async function (req, res) {
  try {
    const targetUser = await User.findOne({
      include: [
        {
          model: Task,
          attributes: { exclude: ["UserId"] },
        },
      ],
      attributes: { exclude: ["password"] },
      where: { id: req.params.id },
    });
    res.send(targetUser);
  } catch (error) {
    errorHandler(res, error);
  }
});

router.post("/", async function (req, res) {
  try {
    const targetUser = await User.findByPk(req.body.user);
    if (!targetUser) {
      return res.status(404).send({ message: "user not found." });
    }
    const task = await Task.create({
      title: req.body.title,
      description: req.body.description,
      isComplete: req.body.isComplete,
      UserId: req.body.user,
    });
    res.status(201).send(task);
  } catch (error) {
    errorHandler(res, error);
  }
});

module.exports = router;
