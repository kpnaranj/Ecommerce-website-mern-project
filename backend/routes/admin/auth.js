// public libraries
const express = require("express");
const {
  signup,
  signin,
  requireSignin,
} = require("../../controllers/admin/auth");
// private libraries
// Initiallize express routes
const router = express.Router();
// Routes get
// Routes post
router.post("/admin/signin", signin);
router.post("/admin/signup", signup);

// Routes put
// Routes delete
// export modules
module.exports = router;
