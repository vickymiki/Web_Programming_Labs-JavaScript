const express = require("express");
const router = express.Router();
const getData = require("../data/getdata");


router.get("/:id", async (req, res) => {

    if (!req.params.id) {
        const error = {
            class:"error",
            error:"Error : No Id provided"
        };
        res.status(400)
        res.render("pages/error",error)
        return;
    }

    try {
        let character_data = await getData.findCharacterSearch(req.params.id);
        res.render('pages/characters', {character_data});

    } catch (error) {
        const err={
            title:"",
            error:"We're sorry, but no results were found for Id "+ "'" +req.params.id + "'",
            class:"not-found",
        }

        res.status(404)
        res.render("pages/error",err);
    }
});

module.exports = router;
