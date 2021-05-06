// public libraries
const jwt = require("jsonwebtoken");
// private libraries
const User = require("../../models/user");
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
          error: "Admin already exist, try another email",
        });
      }
      // Else, user is not registe, save parameters
      const _user = new User({
        firstName,
        lastName,
        email,
        userName,
        password,
        role: "admin",
      });
      // now save parameters and display results
      _user
        .save()
        .then((data) => {
          if (data) {
            return res.status(200).json({
              //user: data,
              message: "Admin created succesfully..!",
            });
          }
        })
        .catch((err) => {
          if (err) {
            return res.status(400).json({
              error: "Something went wrong, try again",
            });
          }
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
      // Authenticate user
      if (user.authenticate(req.body.password) && user.role === "admin") {
        // if password is similar create a token
        // a token has a payload, secret key and limit time
        const token = jwt.sign({ _id: user._id }, secret_key, {
          expiresIn: "1d",
        });
        // finally return result of elements destructure elements
        const { _id, firstName, lastName, email, role, fullName } = user;
        return res.status(201).json({
          token,
          user: {
            _id,
            firstName,
            lastName,
            email,
            role,
            fullName,
          },
        });
      } else {
        return res.status(400).json({
          message: "The given password is incorrect, try again",
        });
      }
    })
    .catch((err) => {
      if (err) {
        return res
          .status(400)
          .json({ error: "Something went wrong, plese try again later" });
      }
    });
};
// Middleware to require sigin
// In the requireSign in header it is required an authorization element
exports.requireSignin = (req, res, next) => {
  // Obtain the token element from headers
  const token = req.headers.authorization.split(" ")[1];
  const user = jwt.verify(token, secret_key);
  req.user = user;
  console.log(req.user);
  next();
};
