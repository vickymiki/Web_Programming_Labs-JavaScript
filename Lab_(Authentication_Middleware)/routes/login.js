const users = require("../data/users");
const bcrypt = require("bcryptjs");

const data = require('../data');
const userData = data.user
const express = require("express");
const router = express.Router();


router.post("/", async(req,res)=>{

    // get username and passowrd
    const username = req.body['username']
    const password = req.body['password']

    try {
        let user_check = await users.checkUser(username,password);
    
        if(user_check.authenticated) {
            // set the session user after user verified
            req.session.user = { username: username.toLowerCase()};

            // After logging in, you will redirect the user to the /private route
            res.redirect('/private');
        } 
    } catch (error) {
        res.status(400)
        res.render('pages/login', { title: "Login", error: error});
    }

});

module.exports = router;
