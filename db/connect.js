const mongoose = require("mongoose");

class Database {
    constructor() {
        this.connect();
    }
    connect() {
        return mongoose
            .connect("mongodb://127.0.0.1:27017/loginForm")
            .then(() => {
                console.log("Database Connected SuccessFully");
            })
            .catch((err) => {
                console.log(err);
            })
    }
}

module.exports = new Database();