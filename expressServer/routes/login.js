const express = require("express");
const router = express.Router();
const { findUserByEmail } = require("../models/user_model");

router.post("/", (req, res) => {
    findUserByEmail(req.body.email)
        .then(result => {
            if(result.length == 0) {

            } else if (result[0].password == req.body.password) {

            } else {

            }
        })
})

module.exports = router;