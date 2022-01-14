const User = require("./models/user");
const Task = require("./models/task");

(async function () {
  try {
    await User.sync({ alter: true });
    await Task.sync({ alter: true });
  } catch (error) {
    console.error("Unable to connect to sync tables:", error);
    process.exit(1);
  }
})();
