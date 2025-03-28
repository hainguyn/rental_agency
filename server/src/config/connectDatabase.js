import { Sequelize } from "sequelize";

const sequelize = new Sequelize("doan", "root", null, {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

const connectDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection to MySQLDB has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
module.exports = { sequelize, connectDatabase };
