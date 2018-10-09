const Sequelize = require("sequelize");
const sequelize = new Sequelize({
    database: "mynews_db",
    username: "bootcamp",
    password: "notarealpassword",
    host: "localhost",
    dialect: "mysql",
    define: {
        timestamps: false
    },
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});
module.exports = sequelize;