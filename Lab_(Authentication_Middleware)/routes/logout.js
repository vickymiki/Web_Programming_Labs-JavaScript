const users = require('../data/users');
const express = require("express");
const router = express.Router();

router.get("/", async (req,res)=>{

    // Check if session exists
    if (req.session.user) {

        req.session.destroy();
        res.clearCookie('AuthCookie');
        res.render('pages/logout',{title: "Log out"})        
    } else {
        res.render('pages/notLoggedIn',{title: "Not Logged in"})
    }
});

module.exports = router;
