const express = require("express");
const router = express.Router();

const db = require("../models");

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/dashboard/:id", (req, res) => {
  db.User.findOne({
    where: {
      id: req.params.id,
    },
    // include
  })
    .then((foundUser) => {
      res.render("dashboard", {id: foundUser.id});
    })
    .catch((err) => {
      res.render("404");
    });
});

module.exports = router;
