const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const db = require("../models");

// /api/auth/
router.post("/", (req, res) => {
  console.log(req.body);
  // Authenticating a User is Who they say they are.
  db.User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((foundUser) => {
      console.log(foundUser);
      bcrypt
        .compare(req.body.password, foundUser.password)
        .then(function (result) {
          // result == true
          console.log(result);
          if (result) {
            res.json({
              error: false,
              data: {
                id: foundUser.id,
                email: foundUser.email,
                firstName: foundUser.firstName,
                lastName: foundUser.lastName,
                phoneNumber: foundUser.phoneNumber,
              },
              message: "Successfully authenticated",
            });
          }
        });
      //   res.json(foundUser);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        error: true,
        data: null,
        message: "Failed to authenticate user.",
      });
    });
});

module.exports = router;
