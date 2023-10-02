const express = require("express");
const router = express.Router();
const { addPost, getUserPosts } = require("../models/post_model");

router.post("/", (req, res) => {
    const {userId, constent} = req.body;
    addPost({userId, content})
        .then(result => {
            res.status(200).json(result);
        })
        .catch(error = res.status(500).send(error));
});

router.get("/:username", (req, res) => {
    const username = req.params.username;
    getUserPosts(username)
        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => res.status(500).send(error));
});

module.exports = router;