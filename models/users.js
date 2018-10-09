const Sequelize = require("sequelize");
const sequelize = require("./config/connection.js");

const User = sequelize.define("users", {
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
});
module.exports = User;