const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const db = require("../models");

// /api/users/
router.post("/", (req, res) => {
  // Hashing and Encryption
  bcrypt.hash(req.body.password, 5).then(function (hash) {
    // Store hash in your password DB.
    console.log(hash);
    db.User.create({
      email: req.body.email,
      password: hash,
    })
      .then((result) => {
        res.json({
          error: false,
          data: result,
          message: "Successfully created new user",
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: true,
          data: null,
          message: "Unable to create new user.",
        });
      });
  });
});

// /api/users/:id
router.put("/:id", (req, res) => {
  res.json({
    message: "Put route",
  });
});

// /api/users/:id
router.delete("/:id", (req, res) => {
  res.json({
    message: "Delete route",
  });
});

module.exports = router;
