const userRoutes = require("./users");
const loginRoutes = require("./login");
const logoutRoutes = require("./logout");
const privateRoutes = require("./private");
const signupRoutes = require("./signup");

const constructorMethod = (app) => {
    app.use("/", userRoutes);
    app.use("/login", loginRoutes);
    app.use("/logout", logoutRoutes);
    app.use("/private", privateRoutes);
    app.use("/signup", signupRoutes);
    app.use("*", (req, res) => {
        res.status(404);
    });
};

module.exports = constructorMethod;
