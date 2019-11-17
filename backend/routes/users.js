const express = require("express");
const router = express.Router();
const {getAllUsers, createUser} = require("../db/queries/userQueries.js")


router.get("/", getAllUsers)
router.post("/new", createUser)


module.exports = router

