const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const connectDB = require("./db/connect");
const session = require("express-session");
const middleware = require("./middleware/middleware");

const app = express();
const port = 3000;

app.set("view engine", "pug");
app.set("views", "view");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: "gokul",
    resave: true,
    saveUninitialized: false,
}))

const staticUri = path.join(__dirname, "public");
app.use(express.static(staticUri));


//Routes
const registerRoute = require("./routes/registerRoutes");
const loginRoute = require("./routes/loginRoutes");
const logoutRoute = require("./routes/logoutRoutes");
app.use("/register", middleware.isLogin, registerRoute);
app.use("/login", middleware.isLogin, loginRoute);
app.use("/logout", logoutRoute);

app.get(["/", "/index", "/home"], middleware.isAlreadyLogin, (req, res) => {
    const pageData = {
        title: "Home Page",
        userDetails: req.session.gokul,
    }

    res.status(200).render("home", pageData);
})

app.get("/about", (req, res) => {
    res.send("About Page")
})

app.listen(port, () => {
    console.log(`Server is Running in Port ${port} Successfully`)
})