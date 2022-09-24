const express = require("express");
const exphbs = require('express-handlebars');

const session = require("express-session");
const configRoutes = require("./routes");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const static = express.static(__dirname + "/public");
app.use("/public", static);


app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set("view engine", "handlebars");

app.use(
    session({
        name: "AuthCookie",
        secret: "some secret string!",
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 50000 }
    })
);

app.use('/private', (req, res, next) => {

    console.log(req.session.id);
    // if user is logged in render private page of user
    if (req.session.user) {
      next();
        
    } else {
        res.render('pages/notLoggedIn', {title: "Not Logged in", message: "The user is not logged in"});
    }
});

app.use(async (req, res, next) => {

    // Set the user status
    let status;
    if (req.session.user) {
        status = "(Authenticated User)";
    } else {
        status = "(Non-Authenticated User)";
    }
    const now = new Date();

    const method = req.method
    const route = req.originalUrl

    console.log("[" + now + "]" + ": " + method + " " + route + " " + status)
    next();
});

configRoutes(app);
app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log('Your routes will be running on http://localhost:3000');
});
  