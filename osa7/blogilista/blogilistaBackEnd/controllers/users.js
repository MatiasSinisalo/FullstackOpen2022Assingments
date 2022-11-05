const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (request, response) => {
  const usersRequest = await User.find({}).populate("blogs", { user: 0 });
  response.json(usersRequest);
});


usersRouter.get("/:id", async (request, response) => {
  const searchedId = request.params.id
  const usersRequest = await User.findById(searchedId).populate("blogs", { user: 0 });
  response.json(usersRequest);
});

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  if (!username) {
    return response.status(400).json({
      error: "username missing",
    });
  }

  if (username.length < 3) {
    return response.status(400).json({
      error: "username should have a min length of 3",
    });
  }

  if (!name) {
    return response.status(400).json({
      error: "name missing",
    });
  }

  if (!password) {
    return response.status(400).json({
      error: "password missing",
    });
  }

  if (password.length < 3) {
    return response.status(400).json({
      error: "password should have a min length of 3",
    });
  }

  const userWithSameUserName = await User.findOne({ username });
  if (userWithSameUserName) {
    return response.status(400).json({
      error: "username must be unique",
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  const userObj = new User({ username, name, passwordHash });
  await userObj.save();
  response.status(201).send();
});

module.exports = usersRouter;
