const db = require("../models");

module.exports = {
    verifyUser: (req, res) => {
        db.User
            .findOne({
                where: {
                    username: req.params.username,
                    password: req.params.password
                }
            })
            .then(data => res.send(true))
            .catch(err => res.status(422).json(err));
    },
    addUser: (req, res) => {
        db.User
            .create({
                username: req.body.username,
                password: req.body.password
            })
            .then(data => res.send(true))
            .catch(err => res.status(422).json(err));
    }
}