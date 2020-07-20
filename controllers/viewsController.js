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
    include: [db.Alert],
  })
    .then((foundUser) => {
      console.log(foundUser);
      res.render("dashboard", { id: foundUser.id });
    })
    .catch((err) => {
      res.render("404");
    });
});

router.get("/dashboard/:id/new-alert", (req, res) => {
  res.render("newAlert", { id: req.params.id });
});

module.exports = router;
