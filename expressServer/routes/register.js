const express = require("express");
const router = express.Router();
const { addUser, findUserByEmail } = require("../models/user_model");

router.post("/", (req, res) => {
    findUserByEmail(req.body.email)
        .then(result => {
            if (result.length == 0) {
                addUser(req.body)
                    .then(result1 => {
                        res.status(200).json(result1);
                    })
                    .catch(error => res.status(500).send(error));
            } else {
                res.send("user email is already in the system");
            }
        })
        .catch(error => res.status(500).json(error));
})

module.exports = router;