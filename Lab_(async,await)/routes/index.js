const searchRoutes = require("./search");
const charactersRoutes = require("./characters");
const path = require("path");

const constructorMethod = (app) => {
    app.use("/search", searchRoutes);
    app.use("/characters", charactersRoutes);
    app.get("/", (req, res) => {
        res.render("pages/search");
    });

    app.use("*", (req, res) => {
    
        // res.status(404);
        res.status(404).json('Error 404 : Page not found' );
    });
};

module.exports = constructorMethod;
