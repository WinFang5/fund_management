// @login & register
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const User = require("../../models/User");
const keys = require("../../config/keys.js");

// $route GET api/users/test
// @desc 返回的请求的json数据
// @access public
// router.get("/test", (req, res) => {
//   res.json({
//     msg: "login works",
//   });
// });

// $route POST api/users/register
// @desc 返回的请求的json数据
// @access public
router.post("/register", (req, res) => {
  // console.log('www',req.body);

  // 查询数据库是否拥有邮箱
  User.findOne({
    email: req.body.email,
  }).then((user) => {
    if (user) {
      return res.status(400).json("Email already exists");
    } else {
      const avatar = gravatar.url("req.body.email", {
        s: "200",
        r: "pg",
        d: "mm",
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        avatar,
        identity: req.body.identity,
      });

      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
          // Store hash in your password DB.
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

// $route POST api/users/login
// @desc 返回token jwt passport
// @access public
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  // 查询数据库
  User.findOne({
    email,
  }).then((user) => {
    if (!user) {
      return res.status(404).json("User not found");
    }

    // 用户存在 密码匹配 返回token
    bcrypt.compare(password, user.password, function (err, result) {
      if (result === true) {
        // jwt.sign("规则","加密名字","过期时间","箭头函数")
        const rule = {
          id: user.id,
          name: user.name,
          avatar: user.avatar,
          identity: user.identity,
        };
        jwt.sign(rule, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
          if (err) throw err;
          res.json({
            success: true,
            token: `Bearer ` + token,
          });
        });
      } else {
        return res.status(400).json("password incorrect");
      }
    });
  });
});

// $route GET api/users/current
// @desc return current user
// @access Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      identity: req.user.identity,
    });
  }
);

module.exports = router;
