const db = require("../models");

module.exports = {
    getTopics: (req, res) => {
        db.Topic
            .findAll({ where: { uid: req.params.uid } })
            .then(dbTopic => res.json(dbTopic))
            .catch(err => res.status(422).json(err));
    },
    saveTopic: (req, res) => {
        db.Topic
            .create({
                topic: req.body.topic,
                uid: req.body.uid
            })
            .then(dbTopic => res.send(dbTopic))
            .catch(err => res.status(422).json(err));

    }
}