const db = require("../models");

module.exports = {
    getTopics: (req, res) => {
        db.Topic
            .findAll({ where: { uid: req.params.uid } })
            .then(dbTopic => res.json(dbTopic))
            .catch(err => res.status(422).json(err));
    }
}