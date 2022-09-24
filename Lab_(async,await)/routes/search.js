const express = require("express");
const router = express.Router();
const Data = require("../data");
const getData = Data.getdata;



router.post("/", async (req, res) => { 

    // Store the character name.
    let characterName = req.body['searchTerm'];

    if (!characterName) {
        const error = {
            class:"error",
            error:"Error : No input provided to search"
        };
        res.status(400)
        res.render("pages/error",error)
        return;
    }
    if (!characterName.replace(/\s/g, "").length) {
        const error = {
            class:"error",
            error:"Error : Blank Spaces are provided as input to search"
    };
        res.status(400)
        res.render("pages/error",error)
        return;
    }
    
    try {
        //remove blank spaces after text
        characterName = characterName.trim()  
        const data = await getData.search(characterName);
        res.render('pages/output', {
            data:data,
            search:characterName
        });
    } catch (error) {
        const err={
            title:"",
            error:"We're sorry, but no results were found for "+ "'" +characterName + "'",
            class:"not-found",
        }

        res.status(404)
        res.render("pages/error",err);
    }
});

module.exports = router;
