const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../schemas/UserSchema");

router.get("/", (req, res) => {
    const pageData = {
        "title": "User Login",
    }
    res.status(200).render("login", pageData);
});


router.post("/", async (req, res) => {
    const pageData = req.body;
    pageData.title = "User Login";
    const username = req.body.username.trim()
    const password = req.body.password.trim()
    if (username && password) {
        const user = await User.findOne({ username: username }).catch((err) => {
            console.log(err);
            pageData.errorMessage = "Something Went Wrong...!";
            res.status(200).render("login", pageData);
        });

        if (user != null) {
            const result = await bcrypt.compare(password, user.password);
            if (result == true) {
                req.session.gokul = user;
                return res.redirect("/home");
            } else {
                pageData.errorMessage = "Login Credentials incorrect";
                res.status(200).render("login", pageData);
            }
        } else {
            pageData.errorMessage = "Login Credentials incorrect";
            res.status(200).render("login", pageData);
        }
    }
    pageData.errorMessage = "Make Sure each field as valid value"
    res.status(200).render("login", pageData);
})

module.exports = router;