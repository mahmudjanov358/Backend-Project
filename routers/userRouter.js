const { Router } = require("express"); // ----------Router
const user = Router(); // ----------User

const {
  postUser,
  getUser,
  getUserById,
} = require("../controllers/user.controller"); // ----------Controllers

// ----------Paths
user.post("/postUser", postUser);
user.get("/getUser", getUser);
user.get("/getUserById/:id", getUserById);

module.exports = { user }; // ----------Exports
