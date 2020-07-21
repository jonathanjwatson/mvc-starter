const express = require("express");
const cheerio = require("cheerio");
const axios = require("axios");
const router = express.Router();
const db = require("../models");

// /api/alerts/
router.post("/", (req, res) => {
  console.log(req.body);
  axios
    .get(req.body.url)
    .then(({ data }) => {
      const $ = cheerio.load(data);
      //   console.log($);
      const name = $("#productTitle").text().trim();
      const dealPriceEl = $("#priceblock_dealprice");
      const ourPriceEl = $("#priceblock_ourprice");
      let price;
      if (dealPriceEl.text()) {
        price = dealPriceEl.text().trim();
      } else if (ourPriceEl.text()) {
        price = ourPriceEl.text().trim();
      } else {
        console.log("Neither of those matched");
      }
      //   const landingImage = $("#landingImage").attr("src");
      //   console.log(name);
      //   console.log(price);
      //   console.log("======================");
      //   console.log(landingImage);
      db.Alert.create({
        url: req.body.url,
        title: name,
        price: price,
        UserId: req.body.UserId,
      })
        .then((result) => {
          res.json({
            error: false,
            data: result,
            message: "Successfully created new alert",
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            error: true,
            data: null,
            message: "Unable to create new alert with data provided. Please try again.",
          });
        });
    })
    .catch((err) => {
      res.status(404).json({
        error: true,
        data: null,
        message: "Unable to find your request URL. Please try a different URL.",
      });
    });
});

// /api/alerts/:id
router.put("/:id", (req, res) => {
  res.json({
    message: "Put route",
  });
});

// /api/alerts/:id
router.delete("/:id", (req, res) => {
  res.json({
    message: "Delete route",
  });
});

module.exports = router;
