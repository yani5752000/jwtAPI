const express = require("express");
const router = express.Router();
const { addPost, getUserPosts } = require("../models/post_model");

router.post("/", (req, res) => {
    const {userId, content} = req.body;
    console.log("posts.js: ", req.body);
    addPost({userId, content})
        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => res.status(500).send(error));
});

router.get("/:userId", (req, res) => {
    const userId = req.params.userId;
    console.log("")
    getUserPosts(userId)
        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => res.status(500).send(error));
});

module.exports = router;