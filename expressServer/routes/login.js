const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { findUserByEmail } = require("../models/user_model");

router.post("/", (req, res) => {
    findUserByEmail(req.body.email)
        .then(result => {
            if(result.length == 0) {
                return res.json({Message: "No record"});
            } else if (result[0].password == req.body.password) {
                const username = result[0].username;
                const token = jwt.sign({username}, "our-jsonwebtoken-secret-key", {expiresIn: "1d"});
                res.cookie("token", token);
                return res.json({status: "Success"});
            } else {
                return res.json({Message: "No record"});
            }
        })
        .catch(error => console.log(error));
})

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if(!token) {
        return res.json({Message: "Token is needed. Please Provide it."})
    } else {
        jwt.verify(token, "our-jsonwebtoken-secret-key", (error, decoded) => {
            if(error) {
                return res.json({Message: "Authentication error"})
            } else {
                req.username = decoded.username;
                next();
            }
        })
    }
}

router.get("/getAuth",verifyUser, (req, res) => {
    return res.json({Status: "Success", username: req.username});
})

router.get("/logout", (req, res) => {
    res.clearCookie("token");
    return res.json({Status: "Success"});
})

module.exports = router;