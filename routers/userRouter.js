const { Router } = require("express");
const user = Router();

const { postUser, getUser } = require("../controllers/user.controller");

user.post("/postUser", postUser);
user.get("/getUser", getUser);

module.exports = { user };
