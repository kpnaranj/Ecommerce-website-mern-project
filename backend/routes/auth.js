// public libraries
const express = require("express");
const { signup, signin } = require("../controllers/auth");
// private libraries
// Initiallize express routes
const router = express.Router();
// Routes get
// Routes post
router.post("/signin", signin);
router.post("/signup", signup);
// Routes put
// Routes delete
// export modules
module.exports = router;
