const users = require('../data/users');
const express = require("express");
const router = express.Router();

router.get("/", async (req,res)=>{
    res.render('pages/private',{title:"User Page", username: req.session.user.username})
});

module.exports = router;
