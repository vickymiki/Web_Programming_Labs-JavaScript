const bcrypt = require("bcryptjs");

const users = require("../data/users");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    // user is authenticated, it will redirect to /private
    if (req.session.user) {
        return res.redirect("/private");
    } else {
        res.render("pages/login", { title: "Login", heading: "Login" });
    }
});

module.exports = router;
