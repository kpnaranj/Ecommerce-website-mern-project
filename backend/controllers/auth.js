// public libraries
const jwt = require("jsonwebtoken");
// private libraries
const User = require("../models/user");
// Variables
const secret_key = process.env.KEY_JWT;
// Functions
// Signup
exports.signup = (req, res) => {
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
        password,
      });
      // now save parameters and display results
      _user
        .save()
        .then((data) => {
          return res.status(200).json({
            //user: data,
            message: "User created succesfully..!",
          });
        })
        .catch((err) => {
          console.log(err);
          return res.status(400).json({
            error: "Something went wrong, try again",
          });
        });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({
        error: "User cannot be found, try again",
      });
    });
};
// Signin
exports.signin = (req, res) => {
  // Check if user already exists
  User.findOne({ email: req.body.email })
    .then((user) => {
      // if user is authenticated
      if (user) {
        // Check if user password is correct
        if (user.authenticate(req.body.password)) {
          console.log(user);
        } else {
          console.log("it didnt work");
        }
        return res.status(200).json({
          message: "it worked",
        });
        /* if (user.authenticate(password)) {
          // if user is authenticate use a token
          // A token uses a payload, a secret key, and a expired date
          const token = jwt.sign({ _id: user._id }, secret_key, {
            expiresIn: "1h",
          });
          console.log(token);
          // Once we gave a user token we can destructure elements
          const { firstName, lastName, email, role, fullName } = user;
          // Finally send the elements from the signin page
          res.status(201).json({
            token,
            user: { firstName, lastName, email, role, fullName },
          });
        } else {
          return res
            .status(400)
            .json({ message: "Invalid password, try again" });
        } */
      }
    })
    .catch((err) => {
      if (err) {
        return res.status(400).json({ error: "The email is not here" });
      }
    });
};
