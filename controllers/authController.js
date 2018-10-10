const db = require("../models");

module.exports = {
    verifyUser: (req, res) => {
        db.User
            .findOne({
                where: {
                    username: req.params.username
                }
            })
            .then(dbUser => res.json(dbUser))
            .catch(err => res.status(422).json(err));
    },
    addUser: (req, res) => {
        db.User
            .create({
                username: req.body.username,
                password: req.body.password
            })
            .then(dbUser => res.send(dbUser))
            .catch(err => res.status(422).json(err));
    }
}