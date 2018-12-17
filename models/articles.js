const Sequelize = require("sequelize");
const sequelize = require("./config/connection.js");

const Article = sequelize.define("articles", {
    source: {
        type: Sequelize.STRING,
        allowNull: false
    },
    title: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    sentimenTitle: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    preview: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    sentimentPreview: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    uid: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    choice: {
        type: Sequelize.STRING,
        allowNull: false
    }
});
module.exports = Article;