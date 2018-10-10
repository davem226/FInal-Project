const Sequelize = require("sequelize");
const sequelize = require("./config/connection.js");

const Topic = sequelize.define("topics", {
    topic: {
        type: Sequelize.STRING,
        allowNull: false
    },
    uid: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});
module.exports = Topic;