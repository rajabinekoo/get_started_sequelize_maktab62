const { Sequelize } = require("sequelize");

const connection = new Sequelize("test", "root", "efftoreff", {
  host: "localhost",
  dialect: "mariadb",
});

(async function () {
  try {
    await connection.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
})();

module.exports = connection;
