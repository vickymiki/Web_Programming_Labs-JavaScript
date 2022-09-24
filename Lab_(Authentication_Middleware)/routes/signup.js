const bcrypt = require("bcryptjs");

const users = require('../data/users');
const express = require("express");
const router = express.Router();

router.get("/", (req,res)=>{
    
    // user is authenticated, it will redirect to /private
    if (req.session.user) {
        return res.redirect('/private');
    } else {
        res.render("pages/signUp",{title:"Sign up",heading:"Sign Up"});
    }
});


router.post("/", async(req,res)=>{

    // get username and passowrd
    const username = req.body['username']
    const password = req.body['password']

    try {
        let input_data = await users.createUser(username,password);
    
        if(input_data) {
            // If it returns {userInserted: true} you will redirect to the / page
            res.redirect('/');
        } else {
            res.status(500)
            const error = 'Internal Server Error';
            res.render('pages/signUp',{ title: "Login", error: error});
            return
        }
    } catch (error) {
        res.status(400)
        res.render('pages/signUp',{ title: "Login", error: error});
    }
    
});

module.exports = router;
