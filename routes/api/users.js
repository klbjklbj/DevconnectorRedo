const express = require("express");
const router = express.Router(); //We don't need all of Express, just Router
const User = require("../../models/User");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport=require('passport');

// @route   POST api/users/register
// @desc    Register a user
// @access  Public
router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        return res.status(400).json({
          //key value pairs can be anything, but keep names meaningful to make things easier
          email: "Email already exists"
        });
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: "200",
          r: "pg",
          d: "mm"
        });
        //new object to write to database
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          avatar, //same as avatar:avatar because of deconstruction
          password: req.body.password
        });

        bcrypt.genSalt(10, (err, salt) => {
          if (err) throw err;
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            //update user password with hashed version
            newUser.password = hash;
            //save to database
            newUser
              .save()
              .then(user => res.json(user)) //show what object looks like if successfully saved
              .catch(err => console.log(err));
          });
        });
      }
    })
    .catch(err => console.log(err));
});

// @route   POST api/users/login
// @desc    Login a user/Return JWT token
// @access  Public

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  //Find user by email
  User.findOne({ email }) //same as email:email
    .then(user => {
      if (!user) {
        return res.status(404).json({
          email: "User not found"
        });
      }
      //compare user plain text password just entered to hashed user password in database
      bcrypt
        .compare(password, user.password)
        //isMatch =variable name assigned to output of compare function
        .then(isMatch => {
          if (!isMatch) {
            return res.status(400).json({
              password: "Password does not match"
            });
          }
          const payload = {
            id: user.id,
            name: user.name,
            avatar: user.avatar
          };
          //create token with payload and key
          //add optional expiration
          jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              return res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        })
        .catch(err => console.log(err));
    });
});

// @route   POST api/users/current
// @desc    return current user
// @access  Private
router.get(
  '/current',
  passport.authenticate('jwt',{session:false}), //makes route private
  (req,res)=>{
    res.json({msg:'Success'});
})

module.exports = router;
