// public libraries
const express = require("express");
// private libraries
const User = require("../models/user");
// Initiallize express routes
const router = express.Router();
// Routes get
// Routes post
router.post("/signin", (req, res) => {});
router.post("/signup", (req, res) => {
  // Destructure elements of sigin
  const { firstName, lastName, email, userName, password } = req.body;
  // Check if user is already register
  User.findOne({ email: email })
    .then((user) => {
      // If user exist, then we send an error, we cannot have two users
      if (user) {
        return res.status(422).json({
          error: "User already exist, try another email",
        });
      }
      // Else, user is not registe, save parameters
      const _user = new User({
        firstName,
        lastName,
        email,
        userName,
        hash_password: password,
      });
      // now save parameters and display results
      _user
        .save()
        .then((data) => {
          return res.status(200).json({
            user: data,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});
// Routes put
// Routes delete
// export modules
module.exports = router;
